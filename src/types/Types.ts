export interface TransactionType {
  transactionId: string;
  terminalcode: number;
  sender: string;
  reciver: string;
  paymentType: string;
  dateAndTime: string;
  amount: number;
  bankName: string;
  status: 'SUCCESSFULL' | 'FAILED' | 'IN PROGRESS';
  reason: string;
  message?: string | '-';
  casher: string;
}

export interface PinnedTransType{
  trans:TransactionType;
  note?:string
}

export interface filterOptionType {
  date: boolean
  amount: boolean
  status: boolean
}


export interface UserType {
  merchantId:string;
  pin:string;
  role:'admin'|'casher'|null;
  isAuthenticated?:boolean;
}