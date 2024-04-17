import { Config } from "./config.js";
import { DataSource } from "typeorm";
import { UserEntity, FileEntity } from "./entity/index.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: Config.db.host,
  port: Config.db.port,
  username: Config.db.user,
  password: Config.db.password,
  database: Config.db.database,
  synchronize: true,
  logging: false,
  entities: [UserEntity, FileEntity],
  migrations: [],
  subscribers: [],
});

export const blacklist = new Set();