import {
    countExpenses,
    createExpense,
    ExpenseInput,
    getCategories,
    getPayMethods,
    listExpenses
} from "../repositories/transaction.repository";

export async function registerExpense(data: ExpenseInput) {
    if (!data) {
        throw new Error('Data vacía');
    }

    if (!data.description) {
        throw new Error('El campo descripción no puede estar vacío');
    }

    if (!data.amount) {
        throw new Error('Debe ingreser el mondo del gasto');
    }

    if (!data.category) {
        throw new Error('La categoría es necesaria')
    }

    return createExpense(data);
}

export async function listCategories() {
    return getCategories();
}

export async function listMethods() {
    return getPayMethods();
}

export async function showExpensesList() {
    const items = await listExpenses();
    const total = items.reduce((acc, item) => {acc += item.amount;}, 0);

    return { total, items };
}

export async function showPayMethodsForExpenses() {
    return countExpenses();
}