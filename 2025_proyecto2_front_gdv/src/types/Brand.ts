export interface BrandFormData {
  logo?: string;
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface Brand {
  id: number;
  name: string;
  logo?: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
