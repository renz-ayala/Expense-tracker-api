export interface Transaction {
    id_transaction: number;
    description: string;
    amount: string | number;
    transaction_date: string | Date;
    category_id: number;
    pay_method_id: number | null;
}

export interface PaymentMethod {
    id_method: number;
    name: string;
}

export interface Category {
    id_category: number;
    name: string;
}