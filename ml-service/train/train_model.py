"""
Synthetic trainer for dev: generates a small dataset, trains a RandomForest,
prints AUC and saves a model payload to train/model.joblib

Saved payload structure:
{
  "model": <sklearn estimator>,
  "feature_names": [ ... ],
  "model_version": "v0.1"
}
"""
import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, classification_report

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "model.joblib")
FEATURE_NAMES = [
    "income",
    "expenses",
    "dependents",
    "txn_count",
    "txn_total",
    "txn_avg",
    "txn_std",
]


def generate_synthetic(n=2000, random_state=42):
    rng = np.random.RandomState(random_state)
    income = rng.normal(loc=50000, scale=15000, size=n).clip(0)
    expenses = (income * rng.uniform(0.2, 0.8, size=n)).clip(0)
    dependents = rng.poisson(lam=1.2, size=n)
    txn_count = rng.poisson(lam=40, size=n)
    txn_total = rng.normal(loc=income * 0.5, scale=1000, size=n).clip(0)
    txn_avg = np.where(txn_count > 0, txn_total / txn_count, 0)
    txn_std = rng.normal(loc=50, scale=30, size=n).clip(0)

    # Create signal for label: higher income and lower expenses -> more likely positive
    score = 0.00002 * income - 0.00003 * expenses - 0.05 * dependents + 0.001 * txn_count
    prob = 1 / (1 + np.exp(-score))
    y = (prob > rng.uniform(0, 1, size=n)).astype(int)

    df = pd.DataFrame(
        {
            "income": income,
            "expenses": expenses,
            "dependents": dependents,
            "txn_count": txn_count,
            "txn_total": txn_total,
            "txn_avg": txn_avg,
            "txn_std": txn_std,
            "y": y,
        }
    )
    return df


def train_and_save():
    print("Generating synthetic data...")
    df = generate_synthetic()
    X = df[FEATURE_NAMES].values
    y = df["y"].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)

    print("Training RandomForestClassifier...")
    clf = RandomForestClassifier(n_estimators=100, random_state=1)
    clf.fit(X_train, y_train)

    print("Evaluating...")
    y_proba = clf.predict_proba(X_test)[:, 1]
    auc = roc_auc_score(y_test, y_proba)
    print(f"AUC: {auc:.4f}")
    print("Classification report (test):")
    y_pred = (y_proba >= 0.5).astype(int)
    print(classification_report(y_test, y_pred, digits=4))

    payload = {
        "model": clf,
        "feature_names": FEATURE_NAMES,
        "model_version": "v0.1",
    }

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    joblib.dump(payload, OUTPUT_PATH)
    print(f"Saved model to {OUTPUT_PATH}")


if __name__ == "__main__":
    train_and_save()