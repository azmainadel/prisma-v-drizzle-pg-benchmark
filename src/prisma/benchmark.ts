import { run, bench } from "mitata";
import * as Prisma from "@prisma/client";

import {
    citySearchIds,
    countrySearchCodes
} from "../meta/meta";

const prisma = new Prisma.PrismaClient();

bench("Prisma ORM Cities: getAll", async () => {
  await prisma.city.findMany();
});

bench("Prisma ORM Cities: getInfo", async () => {
  for (const id of citySearchIds) {
    await prisma.city.findUnique({
      where: {
        id,
      },
    });
  }
});

bench("Prisma ORM Cities: search", async () => {
  for (const it of countrySearchCodes) {
    await prisma.city.findMany({
      where: {
        countryCode: {
          contains: it,
          mode: "insensitive",
        },
      },
    });
  }
});

bench("Prisma ORM Countries: getAll", async () => {
  await prisma.country.findMany();
});

bench("Prisma ORM Countries: getInfo", async () => {
  for (const it of countrySearchCodes) {
    await prisma.country.findUnique({
      where: {
        code: it
      },
    });
  }
});

const main = async () => {
  await run();
};

main();