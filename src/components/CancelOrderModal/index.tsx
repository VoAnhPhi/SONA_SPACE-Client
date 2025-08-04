import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import './styles.scss';

interface CancelOrderModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (reason: string) => Promise<void>;
  loading?: boolean;
  orderHash?: string;
}

const { TextArea } = Input;

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  loading = false,
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

  return (
    <Modal
      title="Hủy đơn hàng"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      className="cancel-order-modal"
    >
      <div className="modal-content">
        <div className="order-info">
          <p>
            <strong>Đơn hàng:</strong> #{orderHash}
          </p>
          <p className="warning-text">
            ⚠️ Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác.
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Lý do hủy đơn hàng"
            name="reason"
            rules={[
              { required: true, message: 'Vui lòng nhập lý do hủy đơn hàng' },
              { min: 150, message: 'Lý do hủy đơn hàng phải có ít nhất 150 ký tự' },
            ]}
          >
            <TextArea
              rows={6}
              placeholder="Vui lòng mô tả chi tiết lý do bạn muốn hủy đơn hàng này (tối thiểu 150 ký tự)..."
              showCount
              maxLength={1000}
            />
          </Form.Item>

          <div className="help-text">
            <p>
              <strong>Lưu ý:</strong> Việc hủy đơn hàng sẽ được xem xét và xử lý trong vòng 24 giờ. 
              Nếu đơn hàng đã được xác nhận hoặc đang trong quá trình vận chuyển, 
              chúng tôi sẽ liên hệ với bạn để thông báo kết quả.
            </p>
          </div>

          <div className="modal-actions">
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Giữ đơn hàng
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              className="submit-button"
              danger
            >
              {loading ? 'Đang xử lý...' : 'Xác nhận hủy đơn hàng'}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default CancelOrderModal;
