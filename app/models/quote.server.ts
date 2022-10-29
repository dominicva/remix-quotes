import type { Quote } from '@prisma/client';
import prisma from '~/db.server';

export const getAllQuotes = async () => {
  return prisma.quote.findMany({
    select: { id: true, text: true, authorName: true },
  });
};

export const getOneQuote = async ({ id }: Quote) => {
  return prisma.quote.findUnique({ where: { id } });
};

export const createQuote = async (quote: Quote) => {
  return prisma.quote.create({ data: quote });
};

export const updateQuote = async (quote: Quote) => {
  return prisma.quote.update({ where: { id: quote.id }, data: quote });
};

export const deleteQuote = async ({ id }: Quote) => {
  return prisma.quote.delete({ where: { id } });
};
