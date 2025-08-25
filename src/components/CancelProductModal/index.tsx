import React from 'react';
import { Modal, Form, Input, Button, Image } from 'antd';
import './styles.scss';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: {
    name: string;
    hex: string;
  };
}

interface CancelProductModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (reason: string) => Promise<void>;
  loading?: boolean;
  product?: Product;
  orderHash?: string;
}

const { TextArea } = Input;

const CancelProductModal: React.FC<CancelProductModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  loading = false,
  product,
  orderHash = '',
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values.reason);
      
      // Reset form sau khi submit thành công
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  if (!product) return null;

  const productTotal = product.price * product.quantity;

  return (
    <Modal
      title="Hủy sản phẩm"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={650}
      className="cancel-product-modal"
    >
      <div className="modal-content">
        <div className="order-info">
          <p>
            <strong>Đơn hàng:</strong> #{orderHash}
          </p>
        </div>

        <div className="product-info">
          <div className="product-card">
            <div className="product-image">
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                style={{ objectFit: 'cover', borderRadius: '8px' }}
                fallback="/images/default-product.jpg"
              />
            </div>
            <div className="product-details">
              <h4 className="product-name">{product.name}</h4>
              {product.color && (
                <div className="product-color">
                  <span className="color-label">Màu sắc:</span>
                  <div className="color-info">
                    <div 
                      className="color-swatch" 
                      style={{ backgroundColor: product.color.hex }}
                    ></div>
                    <span className="color-name">{product.color.name}</span>
                  </div>
                </div>
              )}
              <div className="product-quantity">
                <span>Số lượng: <strong>{product.quantity}</strong></span>
              </div>
              <div className="product-price">
                <span>Đơn giá: <strong>{product.price.toLocaleString('vi-VN')}₫</strong></span>
              </div>
              <div className="product-total">
                <span>Tổng tiền: <strong className="total-amount">{productTotal.toLocaleString('vi-VN')}₫</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="warning-section">
          <div className="warning-box">
            <div className="warning-icon">⚠️</div>
            <div className="warning-content">
              <p className="warning-title">Xác nhận hủy sản phẩm</p>
              <p className="warning-text">
                Bạn có chắc chắn muốn hủy sản phẩm "<strong>{product.name}</strong>" khỏi đơn hàng này không? 
                Hành động này không thể hoàn tác.
              </p>
              <p className="refund-info">
                💰 Số tiền hoàn lại dự kiến: <strong>{productTotal.toLocaleString('vi-VN')}₫</strong>
              </p>
            </div>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Lý do hủy sản phẩm"
            name="reason"
            rules={[
              { required: true, message: 'Vui lòng nhập lý do hủy sản phẩm' },
              { min: 20, message: 'Lý do hủy sản phẩm phải có ít nhất 20 ký tự' },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Vui lòng mô tả lý do bạn muốn hủy sản phẩm này (tối thiểu 20 ký tự)..."
              showCount
              maxLength={500}
            />
          </Form.Item>

          <div className="help-text">
            <p>
              <strong>Lưu ý:</strong> Việc hủy sản phẩm sẽ được xử lý ngay lập tức. 
              Số tiền hoàn lại sẽ được trừ vào tổng giá trị đơn hàng. 
              Nếu đây là sản phẩm cuối cùng trong đơn hàng, toàn bộ đơn hàng sẽ bị hủy.
            </p>
          </div>

          <div className="modal-actions">
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Giữ sản phẩm
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              className="submit-button"
              danger
            >
              {loading ? 'Đang xử lý...' : 'Xác nhận hủy sản phẩm'}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default CancelProductModal;
