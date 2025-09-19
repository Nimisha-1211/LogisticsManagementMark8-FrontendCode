import React, { useState, useEffect } from "react";
import UserShipmentCard from "../../components/user/UserShipmentCard";
import { dummyShipments } from "./UserDashboard"; // 

const ShipmentHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    
    setHistory(dummyShipments);
  }, []);

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 fw-bold text-dark">Shipment History</h1>
        <p className="text-muted">
          Browse all your past and current shipments.
        </p>
      </div>

      {/* History List */}
      <div className="d-flex flex-column">
        {history.length > 0 ? (
          history.map((shipment) => {
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
                    console.log("View shipment history:", shipment.orderId)
                  }
                />
              </div>
            );
          })
        ) : (
          <p className="text-muted">No shipment history available.</p>
        )}
      </div>
    </div>
  );
};

export default ShipmentHistory;
