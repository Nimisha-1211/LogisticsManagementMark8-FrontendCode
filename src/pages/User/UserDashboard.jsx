import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, TrendingUp, Clock, CheckCircle } from "lucide-react";
import UserShipmentCard from "../../components/user/UserShipmentCard";


const dummyShipments = [
  {
    _id: "1",
    orderId: "ORD123",
    status: "In Transit",
    orderPlacedDate: "2025-09-01",
    expectedDeliveryDate: "2025-09-20",
    deliveryAddress: { address: "Hyderabad, India" },
    assignDriver: { name: "Ravi Kumar" },
    product: { productDetails: { description: "Laptop", price: 60000 } },
    quantity: 1,
  },
  {
    _id: "2",
    orderId: "ORD124",
    status: "Delivered",
    orderPlacedDate: "2025-08-25",
    expectedDeliveryDate: "2025-09-05",
    deliveryAddress: { address: "Chennai, India" },
    assignDriver: { name: "Suresh" },
    product: { productDetails: { description: "Smartphone", price: 25000 } },
    quantity: 2,
  },
  {
    _id: "3",
    orderId: "ORD125",
    status: "Pending",
    orderPlacedDate: "2025-09-10",
    expectedDeliveryDate: "2025-09-25",
    deliveryAddress: { address: "Bangalore, India" },
    assignDriver: null,
    product: { productDetails: { description: "Books", price: 1500 } },
    quantity: 5,
  },
];


const dummyStats = [
  { title: "Total Shipments", value: 15, change: "+5%", icon: Package, color: "primary" },
  { title: "Active Shipments", value: 4, change: "+2%", icon: Clock, color: "warning" },
  { title: "Delivered", value: 10, change: "+8%", icon: CheckCircle, color: "success" },
  { title: "Total Value", value: "₹1,50,000", change: "+12%", icon: TrendingUp, color: "info" },
];

const UserDashboard = () => {
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setStats(dummyStats);
    setOrders(dummyShipments);
  }, []);

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 fw-bold text-dark">Dashboard</h1>
        <p className="text-muted">Welcome back! Here's what's happening with your shipments.</p>
      </div>

      {/* Stats Grid */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <div className="card shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted mb-1 small">{stat.title}</p>
                    <h5 className="fw-bold mb-0">{stat.value}</h5>
                    <small className="text-success">{stat.change} from last month</small>
                  </div>
                  <div className={`rounded-circle bg-${stat.color} bg-opacity-10 p-3`}>
                    <Icon className={`text-${stat.color}`} size={24} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="row g-4">
        {/* Recent Shipments */}
        <div className="col-12 col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 fw-semibold">Recent Shipments</h2>
            <a href="/user/my-shipments" className="text-primary text-decoration-none small fw-semibold">
              View All
            </a>
          </div>
          <div className="d-flex flex-column">
            {orders.slice(0, 3).map((shipment) => {
              const productDetails = shipment.product?.productDetails || {};
              return (
                <div key={shipment._id} className="mb-3">
                  <UserShipmentCard
                    shipment={{
                      id: shipment.orderId,
                      description: productDetails.description || "No product details",
                      status: shipment.status,
                      shippedDate: new Date(shipment.orderPlacedDate).toDateString(),
                      expectedDate: new Date(shipment.expectedDeliveryDate).toDateString(),
                      destination: shipment.deliveryAddress.address,
                      carrier: shipment.assignDriver?.name || "Not Assigned",
                      value: productDetails.price ? productDetails.price * shipment.quantity : "N/A",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-12 col-lg-6">
          <h2 className="h5 fw-semibold mb-3">Quick Actions</h2>
          <div className="d-flex flex-column">
            <button className="btn btn-primary text-start mb-3 p-3" onClick={() => navigate("/user/track-shipment")}>
              <h6 className="fw-semibold mb-1">Track a Shipment</h6>
              <small className="text-light">Enter tracking number to get real-time updates</small>
            </button>
            <button className="btn btn-success text-start mb-3 p-3" onClick={() => navigate("/user/create-shipment")}>
              <h6 className="fw-semibold mb-1">Create New Shipment</h6>
              <small className="text-light">Start a new shipping request</small>
            </button>
            <button className="btn btn-secondary text-start mb-3 p-3" onClick={() => navigate("/user/shipment-history")}>
              <h6 className="fw-semibold mb-1">Shipment History</h6>
              <small className="text-light">View all completed shipments</small>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { dummyShipments };
export default UserDashboard;
