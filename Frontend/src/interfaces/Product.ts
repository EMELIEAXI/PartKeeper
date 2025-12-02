export interface Product {
  id: number; 
  articleNumber: string;
  productName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  quantity: number;
  location: string;
  minimumStock: number;
  createdAt: Date;
}