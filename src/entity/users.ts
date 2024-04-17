import { EntitySchema } from "typeorm";
import { UserType } from "../types/index.js";

export const UserEntity = new EntitySchema<UserType>({
  name: "UserType",
  tableName: "users",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: "increment",
    },
    userId: {
      type: "varchar",
    },
    username: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
  },
});
