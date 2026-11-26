import {Router} from 'express';
import {
    getCategories,
    getExpenses,
    getPaymentMethods,
    getPaymentMethodsCounter,
    postExpense
} from "../controllers/transaction.controller";

const router = Router();

router.post('/expenses', postExpense);
router.get('/expenses', getExpenses);
router.get('/expenses/by-payment-method', getPaymentMethodsCounter);
router.get('/categories', getCategories);
router.get('/payment-method', getPaymentMethods);

export default router;