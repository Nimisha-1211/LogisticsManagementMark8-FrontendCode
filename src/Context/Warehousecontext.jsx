
import React, { createContext, useState, useContext, useEffect } from "react";


const WarehouseContext = createContext();


export const useWarehouse = () => {
  return useContext(WarehouseContext);
};


export const WarehouseProvider = ({ children }) => {
  
  const [warehouses, setWarehouses] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/warehouses"); 
      const data = await response.json();
      setWarehouses(data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const fetchShipments = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/shipments"); 
      const data = await response.json();
      setShipments(data);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const assignDriver = (shipmentId, driverId) => {
    setShipments((prev) =>
      prev.map((shipment) =>
        shipment.id === shipmentId
          ? { ...shipment, driverId, status: "Assigned" }
          : shipment
      )
    );
  };

  
  useEffect(() => {
    fetchWarehouses();
    fetchShipments();
  }, []);

  return (
    <WarehouseContext.Provider
      value={{
        warehouses,
        shipments,
        drivers,
        loading,
        fetchWarehouses,
        fetchShipments,
        assignDriver,
        setDrivers, 
      }}
    >
      {children}
    </WarehouseContext.Provider>
  );
};
