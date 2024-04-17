import "reflect-metadata";
import express from "express";
import cors from "cors";
import { Config } from "./src/config.js";
import { AppDataSource } from "./src/setup.js";
import {
  signIn,
  signUp,
  signInNewToken,
  fileUpload,
  fileList,
  fileGet,
  fileDownload,
  fileUpdate,
  userInfo,
  logout,
} from "./src/resolver/index.js";
import { authMiddleware } from "./src/middleware/auth.middleware.js";
import multer from "multer";
import { v4 as uuid } from "uuid";
import { fileDelete } from "./src/resolver/file-delete.js";

const server = express();
const router = express.Router();

const storage = multer.diskStorage({
  destination: "files",
  filename: (_, file, callback) => {
    callback(null, `${uuid()}-${file.originalname.trim()}`);
  },
});
const upload = multer({ storage: storage });

server.use(cors());
server.use(express.json());
server.use("/", router);

server.get("/signin", signIn);
server.get("/file-list", authMiddleware, fileList);
router.get("/file/:id", authMiddleware, fileGet);
server.get("/file/download/:id", authMiddleware, fileDownload);
server.get("/info", authMiddleware, userInfo);
server.get("/logout", authMiddleware, logout);

server.post("/signup", signUp);
server.post("/signin/new_token", signInNewToken);
server.post("/file/upload", authMiddleware, upload.single("file"), fileUpload);

server.delete("/file/delete/:id", authMiddleware, fileDelete);

server.put(
  "/file/update/:id",
  authMiddleware,
  upload.single("file"),
  fileUpdate
);

server.listen(Config.port, async () => {
  await AppDataSource.initialize();

  console.log("==========================================================");
  console.log(
    `Server successfully started at [${Config.domain}:${Config.port}]`
  );
  console.log("==========================================================");
});
