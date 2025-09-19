
import React, { createContext, useContext, useState, useEffect } from 'react';

const initialShipmentState = {
  shipments: [],
  loading: false,
  error: null,
  selectedShipment: null,
  filters: {
    status: 'all', 
    searchTerm: '',
    dateRange: null
  },
  statistics: {
    total: 0,
    pending: 0,
    inTransit: 0,
    delivered: 0,
    cancelled: 0
  }
};


const ShipmentContext = createContext();


export const useShipment = () => {
  const context = useContext(ShipmentContext);
  if (!context) {
    throw new Error('useShipment must be used within a ShipmentProvider');
  }
  return context;
};


export const ShipmentProvider = ({ children }) => {
  const [state, setState] = useState(initialShipmentState);

  
  const mockShipments = [
    {
      id: 'SH001',
      trackingNumber: 'TRK123456789',
      sender: {
        name: 'John Doe',
        address: '123 Main St, New York, NY 10001',
        phone: '+1-555-0123'
      },
      recipient: {
        name: 'Jane Smith',
        address: '456 Oak Ave, Los Angeles, CA 90001',
        phone: '+1-555-0456'
      },
      status: 'in-transit',
      createdDate: '2024-01-15T10:30:00Z',
      estimatedDelivery: '2024-01-20T18:00:00Z',
      weight: 2.5,
      dimensions: { length: 30, width: 20, height: 15 },
      service: 'Express',
      cost: 25.99
    },
    {
      id: 'SH002',
      trackingNumber: 'TRK987654321',
      sender: {
        name: 'Alice Johnson',
        address: '789 Pine St, Chicago, IL 60601',
        phone: '+1-555-0789'
      },
      recipient: {
        name: 'Bob Wilson',
        address: '321 Elm St, Houston, TX 77001',
        phone: '+1-555-0321'
      },
      status: 'delivered',
      createdDate: '2024-01-10T09:15:00Z',
      estimatedDelivery: '2024-01-15T16:00:00Z',
      actualDelivery: '2024-01-14T14:30:00Z',
      weight: 1.8,
      dimensions: { length: 25, width: 15, height: 10 },
      service: 'Standard',
      cost: 15.50
    }
  ];


  useEffect(() => {
    const loadShipments = async () => {
      setState(prev => ({ ...prev, loading: true }));
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const shipments = mockShipments;
        
        const statistics = calculateStatistics(shipments);
        
        setState(prev => ({
          ...prev,
          shipments,
          statistics,
          loading: false,
          error: null
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message || 'Failed to load shipments'
        }));
      }
    };

    loadShipments();
  }, []);

  
  const calculateStatistics = (shipments) => {
    const stats = {
      total: shipments.length,
      pending: 0,
      inTransit: 0,
      delivered: 0,
      cancelled: 0
    };

    shipments.forEach(shipment => {
      switch (shipment.status) {
        case 'pending':
          stats.pending++;
          break;
        case 'in-transit':
          stats.inTransit++;
          break;
        case 'delivered':
          stats.delivered++;
          break;
        case 'cancelled':
          stats.cancelled++;
          break;
        default:
          break;
      }
    });

    return stats;
  };

  
  const addShipment = (shipmentData) => {
    const newShipment = {
      ...shipmentData,
      id: `SH${Date.now()}`,
      trackingNumber: `TRK${Math.random().toString().substr(2, 9)}`,
      createdDate: new Date().toISOString(),
      status: 'pending'
    };

    setState(prev => {
      const updatedShipments = [...prev.shipments, newShipment];
      const updatedStatistics = calculateStatistics(updatedShipments);
      
      return {
        ...prev,
        shipments: updatedShipments,
        statistics: updatedStatistics
      };
    });

    return newShipment;
  };

  
  const updateShipmentStatus = (shipmentId, newStatus) => {
    setState(prev => {
      const updatedShipments = prev.shipments.map(shipment =>
        shipment.id === shipmentId
          ? { 
              ...shipment, 
              status: newStatus,
              ...(newStatus === 'delivered' && { actualDelivery: new Date().toISOString() })
            }
          : shipment
      );
      const updatedStatistics = calculateStatistics(updatedShipments);

      return {
        ...prev,
        shipments: updatedShipments,
        statistics: updatedStatistics
      };
    });
  };

  
  const deleteShipment = (shipmentId) => {
    setState(prev => {
      const updatedShipments = prev.shipments.filter(shipment => shipment.id !== shipmentId);
      const updatedStatistics = calculateStatistics(updatedShipments);

      return {
        ...prev,
        shipments: updatedShipments,
        statistics: updatedStatistics,
        selectedShipment: prev.selectedShipment?.id === shipmentId ? null : prev.selectedShipment
      };
    });
  };

  
  const selectShipment = (shipmentId) => {
    const shipment = state.shipments.find(s => s.id === shipmentId);
    setState(prev => ({
      ...prev,
      selectedShipment: shipment || null
    }));
  };

  const clearSelectedShipment = () => {
    setState(prev => ({
      ...prev,
      selectedShipment: null
    }));
  };

  const updateFilters = (newFilters) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters }
    }));
  };

  
  const getFilteredShipments = () => {
    const { status, searchTerm } = state.filters;
    let filtered = state.shipments;

    
    if (status !== 'all') {
      filtered = filtered.filter(shipment => shipment.status === status);
    }

    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(shipment =>
        shipment.trackingNumber.toLowerCase().includes(searchLower) ||
        shipment.sender.name.toLowerCase().includes(searchLower) ||
        shipment.recipient.name.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  };


  const trackShipment = (trackingNumber) => {
    return state.shipments.find(shipment => 
      shipment.trackingNumber === trackingNumber
    );
  };

  
  const clearError = () => {
    setState(prev => ({
      ...prev,
      error: null
    }));
  };

  
  const contextValue = {
    
    shipments: state.shipments,
    loading: state.loading,
    error: state.error,
    selectedShipment: state.selectedShipment,
    filters: state.filters,
    statistics: state.statistics,
    
    
    addShipment,
    updateShipmentStatus,
    deleteShipment,
    selectShipment,
    clearSelectedShipment,
    updateFilters,
    getFilteredShipments,
    trackShipment,
    clearError
  };

  return (
    <ShipmentContext.Provider value={contextValue}>
      {children}
    </ShipmentContext.Provider>
  );
};


export { ShipmentContext };


export default ShipmentProvider;
