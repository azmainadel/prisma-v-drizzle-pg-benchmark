#  Prisma v Drizzle Benchmark on a PostgreSQL DB
PostgreSQL test dataset benchmark using Prisma and Drizzle ORMs.

## Setting up
1. Make sure *Node, pnpm, Docker* are installed.
2. Use the correct node version as per the `.nvmrc` file. 
```bash
nvm use
```
3. Install the required dependencies. `pnmp` recommended.
```
pnpm install
```
4. Make sure your SQL data files are properly formatted. Use the `script` folder files if you need to modify anything.


## How to run
Make sure you have Docker running.

```bash
pnpm run start
```

## Sample run results on my machine
```text
cpu: Apple M2 Pro
runtime: node v20.8.0 (arm64-darwin)

benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• SELECT * FROM city
------------------------------------------------- -----------------------------
drizzle     5,357 µs/iter   (4,301 µs … 6,745 µs)  5,895 µs  6,726 µs  6,745 µs
prisma      16.39 ms/iter   (14.77 ms … 18.03 ms)   16.5 ms  18.03 ms  18.03 ms

summary for SELECT * FROM city
  drizzle
   3.06x faster than prisma

• SELECT * FROM city WHERE id = ?
------------------------------------------------- -----------------------------
drizzle        60 ns/iter   (54.42 ns … 152.2 ns)  58.39 ns  97.05 ns 112.35 ns
prisma      60.73 ns/iter  (54.97 ns … 133.95 ns)  58.96 ns  99.28 ns 115.95 ns

summary for SELECT * FROM city WHERE id = ?
  drizzle
   1.01x faster than prisma

• SELECT * FROM city WHERE countrycode ilike ?
------------------------------------------------- -----------------------------
drizzle     62.86 ms/iter   (60.29 ms … 64.51 ms)  64.39 ms  64.51 ms  64.51 ms
prisma     204.01 ms/iter (169.61 ms … 224.12 ms) 218.46 ms 224.12 ms 224.12 ms

summary for SELECT * FROM city WHERE countrycode ilike ?
  drizzle
   3.25x faster than prisma

• "SELECT * FROM country"
------------------------------------------------- -----------------------------
drizzle     1,903 µs/iter   (1,133 µs … 4,397 µs)  2,149 µs  3,491 µs  4,397 µs
prisma      3,408 µs/iter   (2,909 µs … 4,384 µs)  3,550 µs  4,327 µs  4,384 µs

summary for "SELECT * FROM country"
  drizzle
   1.79x faster than prisma

• SELECT * FROM country WHERE code = ?
------------------------------------------------- -----------------------------
drizzle     13.81 ms/iter    (11.9 ms … 14.49 ms)  13.94 ms  14.49 ms  14.49 ms
prisma      13.57 ms/iter   (12.58 ms … 17.73 ms)  13.56 ms  17.73 ms  17.73 ms

summary for SELECT * FROM country WHERE code = ?
  prisma
   1.02x faster than drizzle
```