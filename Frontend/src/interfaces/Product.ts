export interface Product {
  id: number; 
  articleNumber: string;
  productName: string;
  description: string;
  categoryId: number;
  quantity: number;
  location: string;
  minimumStock: number;
  createdAt: Date;
}