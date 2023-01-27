import express from "express";
import * as dotenv from "dotenv";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import commentRoutes from "./routes/comment";
import db from "./db";
import { protect } from "./modules/auth";
import { signIn, createNewUser } from "./handlers/user";
import config from "./config";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = config.port;
app.use(cors())
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");
    
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");



//   // Pass to next layer of middleware
//   next();
// });
app.use(express.json());
// app.use(cors());
app.listen(PORT, () => {
  console.log("Listening on localhost:", PORT);
});

app.get("/", (req, res) => {
  console.log(process.env.DATABASE_URL);
  res.status(200).json({ message: "hello" });
});

app.use("/api", protect, [userRoutes]);
app.use("/api/post", protect, [postRoutes]);
app.use("/api/comment", protect, [commentRoutes]);

app.post("/signup", createNewUser);
app.post("/signin", signIn);
