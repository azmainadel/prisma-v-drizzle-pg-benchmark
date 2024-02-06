import { run, bench, group } from "mitata";
import { eq, ilike } from "drizzle-orm";
import { drizzle as drzl } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import * as Prisma from "@prisma/client";
import { ports } from "./constant/ports";

import {
  cities,
  countries,
} from "@/drizzle/schema";

import {
  citySearchIds,
  countrySearchCodes,
} from "./meta/meta";

import { createDBs, deleteDBs } from "./util";

dotenv.config();

const DB_HOST = process.env.DB_HOST ?? "localhost";
const DB_NAME = process.env.DB_NAME ?? "postgres";
const DB_USER = process.env.DB_USER ?? "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD ?? "postgres";
const DB_PORT = process.env.DB_PORT;

console.log(DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT);
const port = Number(DB_PORT || ports.drizzle);
console.log(port);

const dockersDbs = await createDBs(ports);

const drizzlePool = postgres(
  process.env.DATABASE_URL ??
    `postgres://postgres:postgres@localhost:${ports.drizzle}/postgres`
);

const prisma = new Prisma.PrismaClient();

const drizzle = drzl(drizzlePool);

group("SELECT * FROM city", () => {
  bench("drizzle", async () => {
    await drizzle.select().from(cities);
  });

  bench("prisma", async () => {
    await prisma.city.findMany();
  });
});

group("SELECT * FROM city WHERE id = ?", () => {
  bench("drizzle", async () => {
    for (const id of citySearchIds) {
      await drizzle.select().from(cities).where(eq(cities.id, id));
    }
  });

  bench("prisma", async () => {
    for (const id of citySearchIds) {
      await prisma.city.findUnique({
        where: {
          id,
        },
      });
    }
  });
});

group("SELECT * FROM city WHERE countrycode ilike ?", () => {
  bench("drizzle", async () => {
    for (const code of countrySearchCodes) {
      await drizzle
        .select()
        .from(cities)
        .where(ilike(cities.countryCode, `%${code}%`));
    }
  });

  bench("prisma", async () => {
    for (const code of countrySearchCodes) {
      await prisma.city.findMany({
        where: {
          countryCode: {
            contains: code,
            mode: "insensitive",
          },
        },
      });
    }
  });
});

group('"SELECT * FROM country"', () => {
  bench("drizzle", async () => {
    await drizzle.select().from(countries);
  });

  bench("prisma", async () => {
    await prisma.country.findMany();
  });
});

group("SELECT * FROM country WHERE code = ?", () => {
  bench("drizzle", async () => {
    for (const code of countrySearchCodes) {
      await drizzle.select().from(countries).where(eq(countries.code, code));
    }
  });

  bench("prisma", async () => {
    for (const code of countrySearchCodes) {
      await prisma.country.findUnique({
        where: {
          code
        },
      });
    }
  });
});


const main = async () => {
  try {
    await run();
  } catch (e) {
    console.error(e);
  }

  await deleteDBs(dockersDbs);
  process.exit(0);
};

main();