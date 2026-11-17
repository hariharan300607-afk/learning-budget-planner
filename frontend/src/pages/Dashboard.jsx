import { useState, useEffect } from "react";
import BudgetManager from "../components/BudgetManager";
import ResourceManager from "../components/ResourceManager";
import Comparison from "../components/comparison";
function Dashboard() {
   const [resources, setResources] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [monthlyBudget, setMonthlyBudget] = useState(10000);
useEffect(() => {
  const fetchResources = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/resources"
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load resources");
      }

      setResources(
        result.data.map((resource) => ({
          ...resource,
          id: resource._id,
        }))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchResources();
}, []);
useEffect(() => {
  const fetchBudget = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/budget"
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load budget.");
      }

      setMonthlyBudget(result.data.monthlyBudget);
    } catch (error) {
      setError(error.message);
    }
  };

  fetchBudget();
}, []);

const totalExpenses = resources.reduce(
  (total, resource) => total + resource.price,
  0
);

const budgetPercentage =
  monthlyBudget > 0
    ? Math.min((totalExpenses / monthlyBudget) * 100, 100)
    : 0;

const categoryTotals = resources.reduce(
  (totals, resource) => {
    totals[resource.category] =
      (totals[resource.category] || 0) + resource.price;

    return totals;
  },
  {}
);
  return (
    <div className="app-container">

      {/* Navigation */}
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">L</span>
          <span>Learnwise</span>
        </div>

       
<div className="nav-links">
  <a className="active" href="#overview">Overview</a>
  <a href="#budget">My Budget</a>
  <a href="#resources">Resources</a>
  <a href="#comparison">Compare</a>
</div>


        <div className="profile">
          <span>My Workspace</span>
          <div className="avatar">S</div>
        </div>
      </nav>

      {/* Hero */}
      <main className="main-content">
        {loading && <p>Loading your learning resources...</p>}

{error && <p className="error-message">{error}</p>}

        <section className="hero" id="overview">
          <p className="eyebrow">YOUR PERSONAL LEARNING SPACE</p>

          <h1>
            Invest in your future.
            <br />
            <span>Spend with purpose.</span>
          </h1>

          <p className="hero-description">
            Great skills don't have to cost a fortune.
            Plan smarter, learn better, and make every rupee count.
          </p>

          <a href="#budget" className="primary-btn">
  Explore your budget →
</a>
        </section>

        {/* Budget Overview */}
       <BudgetManager
  monthlyBudget={monthlyBudget}
  setMonthlyBudget={setMonthlyBudget}
  resources={resources}
/>

{/* Monthly Spending Analytics */}
<section className="analytics-section" id="analytics">

  <div className="section-heading">
    <div>
      <p className="eyebrow">SPENDING INSIGHTS</p>
      <h2>Where your money goes.</h2>
    </div>
    <span className="month-label">This month</span>
  </div>

  <div className="analytics-card">

    <div className="analytics-top">
      <div>
        <p>Total learning expenses</p>
        <h3>₹{totalExpenses.toLocaleString("en-IN")}</h3>
      </div>
      <span className="analytics-badge">Monthly overview</span>
    </div>

   <div className="chart">
  <div className="chart-row">
    <span>Courses</span>
    <div className="chart-track">
      <div
        className="chart-fill courses"
        style={{
          width: `${totalExpenses > 0 ? ((categoryTotals.Course || 0) / totalExpenses) * 100 : 0}%`,
        }}
      ></div>
    </div>
    <strong>₹{(categoryTotals.Course || 0).toLocaleString("en-IN")}</strong>
  </div>

  <div className="chart-row">
    <span>Certifications</span>
    <div className="chart-track">
      <div
        className="chart-fill certifications"
        style={{
          width: `${totalExpenses > 0 ? ((categoryTotals.Certification || 0) / totalExpenses) * 100 : 0}%`,
        }}
      ></div>
    </div>
    <strong>₹{(categoryTotals.Certification || 0).toLocaleString("en-IN")}</strong>
  </div>

  <div className="chart-row">
    <span>Tools</span>
    <div className="chart-track">
      <div
        className="chart-fill tools"
        style={{
          width: `${totalExpenses > 0 ? ((categoryTotals.Tool || 0) / totalExpenses) * 100 : 0}%`,
        }}
      ></div>
    </div>
    <strong>₹{(categoryTotals.Tool || 0).toLocaleString("en-IN")}</strong>
  </div>
</div>
    <div className="analytics-footer">
      <span>Monthly budget utilization</span>
      <strong>{budgetPercentage.toFixed(1)}%</strong>
    </div>

  </div>
</section>

{/* Learning Resources */}
<ResourceManager
  resources={resources}
  setResources={setResources}
/>
<Comparison resources={resources} />
        {/* Learning Focus */}
        <section className="focus-section">
          <div>
            <p className="eyebrow">KEEP GROWING</p>
            <h2>Your next big skill starts here.</h2>
            <p>
              Discover learning opportunities that fit your goals
              and your budget.
            </p>
          </div>

          <a href="#resources" className="secondary-btn">
  Explore resources →
</a>
        </section>

      </main>

      <footer>
        <p>Learnwise — Make every learning investment count.</p>
      </footer>

    </div>
  );
}

export default Dashboard;

