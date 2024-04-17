export const Config = {
  domain: process.env.DOMAIN || "http://127.0.0.1",
  port: Number(process.env.PORT) || 4566,
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "user!",
    database: process.env.DB_DATABASE || "mydb",
    port: Number(process.env.DB_PORT) || 3306,
  },
  jwtSecret:
    process.env.JWT_SECRET ||
    "c76b035b15f90c5096f908655bd6571feefe2b98127e02bbb204f310e6810a20",
  hashSecret:
    process.env.HASH_SECRET ||
    "c76b035b15f90c5096f908655bd6571feefe2b98127e02bbb204f310e6810a20",
};
