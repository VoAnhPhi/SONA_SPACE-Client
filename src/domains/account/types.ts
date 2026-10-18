export interface Address {
  id: number;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  detail: string;
  isDefault: boolean;
}

export interface UserInfo {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string | string[];
  full_name?: string;
  role?: string;
}
