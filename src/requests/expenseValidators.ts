import { body, check } from "express-validator";

const validFrequencies = ["MONTHLY", "ANNUAL"];

export const createExpenseValidator = [
  body("name").isString(),
  body("cost").isDecimal(),
  body("frequency").isIn(validFrequencies),
];

export const updateExpenseValidator = [
  body("name").isString(),
  body("cost").isDecimal(),
  body("frequency").isIn(validFrequencies),
];
