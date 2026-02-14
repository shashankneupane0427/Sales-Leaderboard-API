// Request body when creating a sale
export interface SaleInput {
  agentName: string;
  amountSold: number;
  numberOfSales: number;
}

// Sale object returned from DB
export interface SaleOutput extends SaleInput {
  id: number;
  createdAt: Date;
}
