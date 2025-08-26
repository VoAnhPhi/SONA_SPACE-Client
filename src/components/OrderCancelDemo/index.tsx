import React, { useState } from 'react';
import { Button } from 'antd';
import CancelOrderModal from '../CancelOrderModal';
import { toast } from 'react-toastify';

// Demo component để test tính năng hủy đơn hàng
const OrderCancelDemo: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOrderCancel = async (reason: string) => {
    // Simulate API call
    console.log('Cancelling order with reason:', reason);
    
    // Replace this with actual API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowModal(false);
    toast.success('Đơn hàng đã được hủy thành công!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Demo Cancel Order Modal</h2>
      <Button 
        type="primary" 
        danger
        onClick={() => setShowModal(true)}
      >
        Hủy đơn hàng
      </Button>

      <CancelOrderModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onSubmit={handleOrderCancel}
        orderHash="DH123456789"
        orderId={123} // Test order ID
      />
    </div>
  );
};

export default OrderCancelDemo;
