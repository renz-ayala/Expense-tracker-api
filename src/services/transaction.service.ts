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

    return createExpense(data);
}

export async function listElements() {
    return getCategories();
}

export async function listMethods() {
    return getPayMethods();
}

export async function showExpensesList() {
    return listExpenses();
}

export async function showPayMethodsForExpenses() {
    return countExpenses();
}