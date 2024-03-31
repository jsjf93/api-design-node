import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  createExpenseValidator,
  updateExpenseValidator,
} from "./requests/expenseValidators";
import { handleInputErrors } from "./modules/middleware";
import {
  getExpense,
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "./handlers/expense";

const router = Router();

/**
 * Expense
 */
router.get("/expense", getExpenses);

router.get("/expense/:id", getExpense);

router.put(
  "/expense/:id",
  updateExpenseValidator,
  handleInputErrors,
  updateExpense
);

router.post(
  "/expense",
  createExpenseValidator,
  handleInputErrors,
  createExpense
);

router.delete("/expense/:id", deleteExpense);

// router.use((err, req, res, next) => {
//   if (err.type === "auth") {
//     res.status(401);
//     res.json({ message: "Unauthorised" });
//   }

//   if (err.type === "input") {
//     res.status(400);
//     return res.send({ message: "invalid input" });
//   }
// });

export default router;
