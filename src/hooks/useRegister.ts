import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateRegisterForm, submitRegisterForm } from '../services/registerService';
import type { RegisterFormData, ValidationErrors } from '../services/registerService';

export const useRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    agreeToTerms: false
  });

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Xóa lỗi khi người dùng bắt đầu sửa
    if (errors[name as keyof ValidationErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  // Xử lý thay đổi checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
    
    // Xóa lỗi khi người dùng bắt đầu sửa
    if (errors[name as keyof ValidationErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  // Xử lý validate form
  const validateForm = (): boolean => {
    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    
    // Validate form trước khi submit
    const isValid = validateForm();
    
    if (isValid) {
      setLoading(true);
      try {
        const response = await submitRegisterForm(formData);
        
        if (response.success) {
          setSuccess(true);
          // Chuyển hướng đến trang đăng nhập sau 2 giây
          setTimeout(() => {
            navigate('/dang-nhap');
          }, 2000);
        } else {
          setApiError(response.message || 'Đã xảy ra lỗi khi đăng ký');
        }
      } catch (error) {
        setApiError('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    formData,
    setFormData,
    errors,
    loading,
    success,
    apiError,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    validateForm
  };
};
