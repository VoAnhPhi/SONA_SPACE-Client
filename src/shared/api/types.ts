// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
  code?: string;
  errors?: Record<string, string>;
  message?: string;
}

// Pagination interface | Defind for all user
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
