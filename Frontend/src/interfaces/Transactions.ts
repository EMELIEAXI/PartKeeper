export interface Transaction {
  transactionId: number;
  productId: number;
  productName: string;
  userId: number;
  quantityChange: number;
  newQuantity: number;
  transactionType: string;
  comment: string;
  timeStamp: Date;
}