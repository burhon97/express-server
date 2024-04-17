import { UserEntity } from "../entity/index.js";
import { AppDataSource } from "../setup.js";

export const UserRepository = AppDataSource.getRepository(UserEntity).extend(
  {}
);
