import PrismaEdge from '@prisma/client/edge';
import Prisma from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaEdge.PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new Prisma.PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new Prisma.PrismaClient();
  }
  prisma = global.prisma;
}
export default prisma;
