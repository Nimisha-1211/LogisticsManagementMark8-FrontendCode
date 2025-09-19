import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyShipments } from "./UserDashboard"; 

const CreateNewShipment = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    orderId: "",
    description: "",
    destination: "",
    quantity: 1,
    price: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newShipment = {
      _id: String(dummyShipments.length + 1),
      orderId: form.orderId,
      status: "Pending",
      orderPlacedDate: new Date().toISOString(),
      expectedDeliveryDate: "2025-10-01",
      deliveryAddress: { address: form.destination },
      assignDriver: null,
      product: {
        productDetails: {
          description: form.description,
          price: Number(form.price),
        },
      },
      quantity: Number(form.quantity),
    };

    
    dummyShipments.push(newShipment);

    alert("✅ Shipment Created Successfully!");

    
    navigate("/user/my-shipments");
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">📦 Create New Shipment</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Order ID</label>
          <input
            className="form-control"
            value={form.orderId}
            onChange={(e) =>
              setForm({ ...form, orderId: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            className="form-control"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Destination</label>
          <input
            className="form-control"
            value={form.destination}
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            min="1"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            min="1"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          ✅ Create Shipment
        </button>
      </form>
    </div>
  );
};

export default CreateNewShipment;
