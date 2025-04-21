export type ProcessStatus = 'OPERATING' | 'SENT' | 'DELIVERED';

export interface ProcessItem {
  productId: string;
  quantity: number;
}

export interface BaseProcess {
  id: string;
  userId: string;
  items: ProcessItem[];
  totalAmount: number;      // precio total del pedido (sum qty*price)
  startDate: Date;
  deliveryDate: Date;
  progressPercentage: number;
  status: ProcessStatus;
}

export type Process = BaseProcess;
