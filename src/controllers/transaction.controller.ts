import { Request, Response } from 'express';
import {
    listCategories,
    listMethods,
    registerExpense,
    showExpensesList,
    showPayMethodsForExpenses
} from "../services/transaction.service";

const default_message = 'Algo salió mal';

export async function postExpense(req: Request, res: Response) {
    try {
        const created = await registerExpense(req.body);
        return res.status(201).json(created);
    } catch (error) {
        const message = error instanceof Error ? error.message : default_message;
        const status = message.includes(default_message) ? 500 : 400;

        return res.status(status).json({message});
    }
}

export async function getCategories(_req: Request, res: Response) {
    try {
        const categories = await listCategories();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting categories' });
    }
}

export async function getPaymentMethods(_req: Request, res: Response) {
    try {
        const methods = await listMethods();
        return res.status(200).json(methods);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting payment methods' });
    }
}

export async function getExpenses(_req: Request, res: Response) {
    try {
        const expenses = await showExpensesList();
        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting expenses' });
    }
}

export async function getPaymentMethodsCounter(_req: Request, res: Response) {
    try {
        const summary = await showPayMethodsForExpenses();
        return res.status(200).json(summary);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting payment methods' });
    }
}