import prisma from "../db";
import { BaseError } from "../errors/baseError";

export const getExpenses = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { expenses: true },
    });

    res.json({ data: user.expenses });
  } catch (error) {
    next(error);
  }
};

export const getExpense = async (req, res, next) => {
  try {
    const id = req.params.id;

    const expense = await prisma.expense.findUnique({
      where: { id, belongsToId: req.user.id },
    });

    res.json({ data: expense });
  } catch (error) {
    next(error);
  }
};

export const createExpense = async (req, res, next) => {
  try {
    const expense = await prisma.expense.create({
      data: {
        name: req.body.name,
        cost: req.body.cost,
        frequency: req.body.frequency,
        belongsToId: req.user.id,
      },
    });

    res.json({ data: expense });
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    console.log(req.params);
    const expense = await prisma.expense.update({
      where: { id: req.params.id, belongsToId: req.user.id },
      data: {
        name: req.body.name,
        cost: req.body.cost,
        frequency: req.body.frequency,
      },
    });

    res.json({ data: expense });
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const expense = await prisma.expense.delete({
      where: { id: req.params.id, belongsToId: req.user.id },
    });

    res.json({ data: expense });
  } catch (error) {
    next(error);
  }
};
