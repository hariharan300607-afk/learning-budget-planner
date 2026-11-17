
function Comparison({ resources }) {
  const freeResources = resources.filter(
    (resource) => resource.price === 0
  );

  const paidResources = resources.filter(
    (resource) => resource.price > 0
  );

  return (
    <section className="comparison-section" id="comparison">
      <div className="section-heading">
        <div>
          <p className="eyebrow">SMART LEARNING</p>
          <h2>Free or paid? Choose wisely.</h2>
        </div>
      </div>

      <div className="comparison-grid">
        <div className="comparison-card">
          <span className="free-tag">FREE OPTIONS</span>
          <h3>{freeResources.length} free resources</h3>

          {freeResources.length === 0 ? (
            <p>No free resources added yet.</p>
          ) : (
            freeResources.map((resource) => (
              <p key={resource.id}>
                {resource.name} — ₹0
              </p>
            ))
          )}
        </div>

        <div className="comparison-card">
          <span className="paid-tag">PAID OPTIONS</span>
          <h3>{paidResources.length} paid resources</h3>

          {paidResources.length === 0 ? (
            <p>No paid resources added yet.</p>
          ) : (
            paidResources.map((resource) => (
              <p key={resource.id}>
                {resource.name} — ₹
                {resource.price.toLocaleString("en-IN")}
              </p>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Comparison;
