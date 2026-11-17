
import { useState } from "react";

function BudgetManager({
  monthlyBudget,
  setMonthlyBudget,
  resources,
}) {
  const [newBudget, setNewBudget] = useState(String(monthlyBudget));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const totalExpenses = resources.reduce(
    (total, resource) => total + Number(resource.price),
    0
  );

  const remainingBudget = monthlyBudget - totalExpenses;

  const utilization =
    monthlyBudget > 0
      ? Math.min((totalExpenses / monthlyBudget) * 100, 100)
      : 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const amount = Number(newBudget);

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Please enter a budget greater than zero.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/budget",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            monthlyBudget: amount,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update budget.");
      }

      setMonthlyBudget(result.data.monthlyBudget);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="budget-section" id="budget">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR FINANCIAL OVERVIEW</p>
          <h2>Manage your learning budget</h2>
        </div>
      </div>

      <form className="budget-form" onSubmit={handleSubmit}>
        <label htmlFor="monthlyBudget">
          Set your monthly budget (₹)
        </label>

        <input
          id="monthlyBudget"
          type="number"
          min="1"
          value={newBudget}
          onChange={(event) => setNewBudget(event.target.value)}
          required
        />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update Budget"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="budget-grid">
        <div className="budget-card">
          <p>Monthly Budget</p>
          <h3>₹{monthlyBudget.toLocaleString("en-IN")}</h3>
        </div>

        <div className="budget-card">
          <p>Total Expenses</p>
          <h3>₹{totalExpenses.toLocaleString("en-IN")}</h3>
        </div>

        <div className="budget-card">
          <p>Remaining Budget</p>
          <h3>
            ₹{remainingBudget.toLocaleString("en-IN")}
          </h3>
        </div>
      </div>

      <div className="budget-progress">
        <div className="progress-heading">
          <span>Budget utilization</span>
          <strong>{utilization.toFixed(1)}%</strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${utilization}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
}

export default BudgetManager;
