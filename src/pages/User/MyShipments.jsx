import React, { useState, useEffect } from "react";
import UserShipmentCard from "../../components/user/UserShipmentCard";
import { dummyShipments } from "./UserDashboard"; 

const MyShipments = () => {
  const [shipments, setShipments] = useState([...dummyShipments]);

  useEffect(() => {
  
    const interval = setInterval(() => {
      setShipments([...dummyShipments]);
    }, 500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 fw-bold text-dark">My Shipments</h1>
        <p className="text-muted">
          Track and manage all your shipments in one place.
        </p>
      </div>

      {/* Shipments List */}
      <div className="d-flex flex-column">
        {shipments.length > 0 ? (
          shipments.map((shipment) => {
            const productDetails = shipment.product?.productDetails || {};
            return (
              <div key={shipment._id} className="mb-3">
                <UserShipmentCard
                  shipment={{
                    id: shipment.orderId,
                    description:
                      productDetails.description || "No product details",
                    status: shipment.status,
                    shippedDate: new Date(
                      shipment.orderPlacedDate
                    ).toDateString(),
                    expectedDate: new Date(
                      shipment.expectedDeliveryDate
                    ).toDateString(),
                    destination: shipment.deliveryAddress.address,
                    carrier: shipment.assignDriver?.name || "Not Assigned",
                    value: productDetails.price
                      ? productDetails.price * shipment.quantity
                      : "N/A",
                  }}
                  onClick={() =>
                    console.log("View shipment:", shipment.orderId)
                  }
                />
              </div>
            );
          })
        ) : (
          <p className="text-muted">No shipments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyShipments;
