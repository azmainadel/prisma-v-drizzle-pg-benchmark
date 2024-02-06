import {
  pgTable,
  varchar,
  numeric,
  text,
  integer,
  smallint,
  real,
} from "drizzle-orm/pg-core";

export const cities = pgTable("city", {
    id: integer("id").notNull(),
    name: text("name").notNull(),
    countryCode: varchar("countrycode", { length: 3 }).notNull(),
    district: text("district").notNull(),
    population: integer("population").notNull(),
});

export const countries = pgTable("country", {
    code: varchar("code", { length: 3 }).notNull(),
    name: text("name").notNull(),
    continent: text("continent").notNull(),
    region: text("region").notNull(),
    surfaceArea: real("surfacearea").notNull(),
    indepYear: smallint("indepyear").notNull(),
    population: integer("population").notNull(),
    lifeExpectancy: real("lifeexpectancy"),
    gnp: numeric('gnp', { precision: 10, scale: 2 }),          
    gnpOld: numeric('gnpold', { precision: 10, scale: 2 }),          
    localName: text("localname").notNull(),       
    governmentForm: text("governmentform").notNull(), 
    headOfState: text("headofstate"), 
    capital: integer("capital"),      
    code2: varchar("code2", { length: 2 }).notNull(),
});