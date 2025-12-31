from fastapi import FastAPI, HTTPException, Request, Header
from pydantic import BaseModel
import os
import joblib
import numpy as np
from typing import Dict, Any

MODEL_PATH = os.path.join("train", "model.joblib")
DEFAULT_MODEL_VERSION = "v0.0"

app = FastAPI(title="Pakconnect ML Service")


class PredictRequest(BaseModel):
    features: Dict[str, float]


def load_model():
    if not os.path.exists(MODEL_PATH):
        return None
    payload = joblib.load(MODEL_PATH)
    # payload expected to be dict containing 'model', 'feature_names', 'model_version'
    return payload


MODEL_PAYLOAD = load_model()


@app.get("/")
async def root():
    return {"status": "ml-service ok", "model_loaded": MODEL_PAYLOAD is not None}


@app.post("/predict")
async def predict(req: PredictRequest, request: Request, x_api_key: str | None = Header(None)):
    # Optional API key check for simple dev auth
    expected_key = os.environ.get("API_KEY")
    if expected_key:
        if x_api_key is None or x_api_key != expected_key:
            raise HTTPException(status_code=401, detail="invalid or missing x-api-key header")

    global MODEL_PAYLOAD
    if MODEL_PAYLOAD is None:
        raise HTTPException(status_code=500, detail="model not available on server; run training")

    model = MODEL_PAYLOAD.get("model")
    feature_names = MODEL_PAYLOAD.get("feature_names", [])
    model_version = MODEL_PAYLOAD.get("model_version", DEFAULT_MODEL_VERSION)

    # Build feature vector in the order expected by the model
    features_in = req.features or {}
    x = []
    for fname in feature_names:
        val = features_in.get(fname, 0.0)
        try:
            x.append(float(val))
        except Exception:
            x.append(0.0)
    X = np.array(x).reshape(1, -1)

    # Predict probability (assumes classifier with predict_proba)
    try:
        proba = float(model.predict_proba(X)[0][1])
    except Exception:
        # fallback to predict if predict_proba not available
        proba = float(model.predict(X)[0])

    decision = "eligible" if proba >= 0.5 else "ineligible"

    # Simple explanation: return feature importances if available
    explanation = {}
    try:
        importances = getattr(model, "feature_importances_", None)
        if importances is not None:
            explanation["feature_importances"] = {
                name: float(imp) for name, imp in zip(feature_names, map(float, importances))
            }
    except Exception:
        pass

    return {
        "score": proba,
        "decision": decision,
        "explanation": explanation,
        "model_version": model_version,
    }