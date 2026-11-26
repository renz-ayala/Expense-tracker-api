import { pool } from '../db/pool';

export interface ExpenseInput {
    description: string;
    amount: number;
    category: number;
    paymentMethod: number;
}

export async function createExpense(data: ExpenseInput) {
    const query = `
        insert into costs.transactions (description, amount, category_id, pay_method_id) 
        values ($1,$2,$3,$4)
        returning *;
    `;

    const values = [
        data.description,
        data.amount,
        data.category,
        data.paymentMethod,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function getCategories() {
    const query = `
        select c.id_category, c.name from costs.categories c
    `;

    const { rows } = await pool.query(query);
    return rows;
}

export async function getPayMethods() {
    const query = `
        select p.id_method, p.name from costs.payment_methods p
    `;

    const { rows } = await pool.query(query);
    return rows;
}

export async function listExpenses() {
    const query = `
        select t.description          as descripcion,
               t.amount               as monto,
               coalesce(pm.name, '-') as metodo_pago,
               coalesce(c.name, '-')  as categoria,
               t.transaction_date     as fecha
        from costs.transactions t
                 left join costs.payment_methods pm
                           on t.pay_method_id = pm.id_method
                 left join costs.categories c
                           on t.category_id = c.id_category
        order by t.transaction_date desc;
    `;

    const { rows } = await pool.query(query);
    return rows;
}

export async function countExpenses(){
    const query = `
        select 
            coalesce(pm."name", '-') as metodo_pago,
            count(t.id_transaction )::int as total_transacciones
        from costs.payment_methods pm 
        right join costs.transactions t
        on t.pay_method_id = pm.id_method
        group by t.pay_method_id, pm."name";
    `;

    const { rows } = await pool.query(query);
    return rows;
}