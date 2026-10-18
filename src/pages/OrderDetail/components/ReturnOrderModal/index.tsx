import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import './styles.scss';

interface ReturnOrderModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (reason: string, images: File[]) => Promise<void>;
  loading?: boolean;
}

const { TextArea } = Input;

const ReturnOrderModal: React.FC<ReturnOrderModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Kiểm tra có ít nhất 1 hình ảnh
      if (fileList.length === 0) {
        message.error('Vui lòng tải lên ít nhất 1 hình ảnh');
        return;
      }

      // Chuyển đổi UploadFile thành File objects
      const imageFiles: File[] = [];
      
      for (const file of fileList) {
        if (file.originFileObj) {
          imageFiles.push(file.originFileObj as File);
        }
      }

      if (imageFiles.length === 0) {
        message.error('Có lỗi xảy ra với các file hình ảnh');
        return;
      }

      await onSubmit(values.reason, imageFiles);
      
      // Reset form sau khi submit thành công
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      // Kiểm tra định dạng file
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Chỉ được tải lên file hình ảnh!');
        return false;
      }

      // Kiểm tra kích thước file (tối đa 5MB)
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Hình ảnh phải nhỏ hơn 5MB!');
        return false;
      }

      // Kiểm tra số lượng file (tối đa 5 file)
      if (fileList.length >= 5) {
        message.error('Chỉ được tải lên tối đa 5 hình ảnh!');
        return false;
      }

      return false; // Prevent auto upload
    },
    onChange: (info) => {
      setFileList(info.fileList);
    },
    fileList,
    multiple: true,
    listType: 'picture-card',
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    onPreview: (file) => {
      // Xem trước hình ảnh
      if (file.url || file.preview) {
        window.open(file.url || file.preview, '_blank');
      }
    },
  };

  const uploadButton = (
    <div style={{ border: 0, background: 'none' }}>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
    </div>
  );

  return (
    <Modal
      title="Yêu cầu trả hàng"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      className="return-order-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Lý do trả hàng"
          name="reason"
          rules={[
            { required: true, message: 'Vui lòng nhập lý do trả hàng' },
            { min: 150, message: 'Lý do trả hàng phải có ít nhất 150 ký tự' },
          ]}
        >
          <TextArea
            rows={6}
            placeholder="Vui lòng mô tả chi tiết lý do bạn muốn trả hàng (tối thiểu 150 ký tự)..."
            showCount
            maxLength={1000}
          />
        </Form.Item>

        <Form.Item
          label="Hình ảnh minh chứng"
          required
        >
          <div className="upload-section">
            <Upload {...uploadProps}>
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
            <div className="upload-help">
              <p>• Tải lên ít nhất 1 hình ảnh minh chứng (tối đa 5 ảnh)</p>
              <p>• Định dạng: JPG, PNG, GIF</p>
              <p>• Kích thước tối đa: 5MB mỗi ảnh</p>
            </div>
          </div>
        </Form.Item>

        <div className="modal-actions">
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            className="submit-button"
          >
            {loading ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu trả hàng'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ReturnOrderModal;
