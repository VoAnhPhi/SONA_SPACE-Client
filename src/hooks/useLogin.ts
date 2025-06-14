import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLoginForm, submitLoginForm, saveAuthData } from '../services/loginService';
import type { LoginFormData, ValidationErrors } from '../services/loginService';
import { useAuth } from '../contexts/AuthContext';

export const useLogin = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  // Xử lý validate form
  const validateForm = (): boolean => {
    const validationErrors = validateLoginForm(formData);
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
        const response = await submitLoginForm(formData);
        
        if (response.success && response.data) {
          const { token, user } = response.data;
          
          // Lưu thông tin đăng nhập
          saveAuthData(token, user, formData.rememberMe);
          
          // Cập nhật context
          auth.login(token, user);
          
          setSuccess(true);
          
          // Chuyển hướng đến trang chủ sau 1 giây
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          setApiError(response.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        }
      } catch (error) {
        setApiError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
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
