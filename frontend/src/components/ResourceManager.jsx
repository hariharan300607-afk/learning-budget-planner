
import { useState } from "react";

function ResourceManager({ resources, setResources }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Course");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setCategory("Course");
    setPrice("");
    setEditingId(null);
    setError("");
  };

  
const handleSubmit = async (event) => {
  event.preventDefault();
  setError("");

  const resourceData = {
    name: name.trim(),
    category,
    price: Number(price),
  };

  if (
    !resourceData.name ||
    price === "" ||
    !Number.isFinite(resourceData.price) ||
    resourceData.price < 0
  ) {
    setError("Please enter a valid name and price.");
    return;
  }

  try {
    const isEditing = editingId !== null;

    const response = await fetch(
      isEditing
        ? `http://localhost:5000/api/resources/${editingId}`
        : "http://localhost:5000/api/resources",
      {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resourceData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to save resource.");
    }

    const savedResource = {
      ...result.data,
      id: result.data._id,
    };

    if (isEditing) {
      setResources((current) =>
        current.map((resource) =>
          resource.id === editingId ? savedResource : resource
        )
      );
    } else {
      setResources((current) => [savedResource, ...current]);
    }

    resetForm();
  } catch (error) {
    setError(error.message);
  }
};

  const handleEdit = (resource) => {
    setEditingId(resource.id);
    setName(resource.name);
    setCategory(resource.category);
    setPrice(String(resource.price));
  };

  
const handleDelete = async (id) => {
  setError("");

  try {
    const response = await fetch(
      `http://localhost:5000/api/resources/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete resource.");
    }

    setResources((current) =>
      current.filter((resource) => resource.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }
  } catch (error) {
    setError(error.message);
  }
};


  return (
    <section className="resources-section" id="resources">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR LEARNING LIBRARY</p>
          <h2>Learn more. Spend smarter.</h2>
        </div>
        <span className="month-label">
          {resources.length} resources
        </span>
      </div>
        {error && <p className="error-message">{error}</p>}
      <form className="resource-form" onSubmit={handleSubmit}>
        <h3>
          {editingId !== null ? "Edit resource" : "Add a learning resource"}
        </h3>

        <input
          type="text"
          placeholder="Resource name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="Course">Course</option>
          <option value="Certification">Certification</option>
          <option value="Tool">Tool</option>
        </select>

        <input
          type="number"
          placeholder="Price in ₹"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          min="0"
          required
        />

        <button type="submit" className="primary-btn">
          {editingId !== null ? "Save Changes" : "+ Add Resource"}
        </button>

        {editingId !== null && (
          <button
            type="button"
            className="cancel-btn"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="resources-grid">
        {resources.map((resource) => (
          <div className="resource-card" key={resource.id}>
            <span className="resource-category">
              {resource.category.toUpperCase()}
            </span>

            <h3>{resource.name}</h3>
            <p>Added to your personal learning library.</p>

            <div className="resource-bottom">
              <span className={resource.price === 0 ? "free-tag" : "paid-tag"}>
                {resource.price === 0 ? "FREE" : "PAID"}
              </span>

              <strong>
                ₹{resource.price.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="resource-actions">
              <button type="button" onClick={() => handleEdit(resource)}>
                Edit
              </button>

              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(resource.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ResourceManager;

