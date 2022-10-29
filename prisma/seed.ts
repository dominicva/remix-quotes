import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  const username = 'george';
  const plaintextPassword = 'orwell';
  const SALT = 10;

  const hashedPassword = await bcrypt.hash(plaintextPassword, SALT);

  const seedUser = await prisma.user.create({
    data: {
      username,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const quotes = [
    {
      text: 'Two things are infinite: the universe and human stupidity; and I’m not sure about the universe.',
      authorName: 'Albert Einstein',
    },
    {
      text: 'I have no special talent. I am only passionately curious.',
      authorName: 'Albert Einstein',
    },
    {
      text: 'The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.',
      authorName: 'Stephen Hawking',
    },
    {
      text: 'The beginning is the most important part of the work.',
      authorName: 'Plato',
    },
    {
      text: 'The unexamined life is not worth living.',
      authorName: 'Socrates',
    },
    {
      text: 'It is the mark of an educated mind to be able to entertain a thought without accepting it.',
      authorName: 'Aristotle',
    },
  ];

  for (const quote of quotes) {
    const seedQuote = await prisma.quote.create({
      data: {
        text: quote.text,
        createdByUser: {
          connect: {
            username: seedUser.username,
          },
        },
        author: {
          // connect to author if already exists, otherwise create a new one
          connectOrCreate: {
            where: { name: quote.authorName },
            create: { name: quote.authorName },
          },
        },
      },
    });

    console.log('seedQuote', seedQuote);
  }
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
