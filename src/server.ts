import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import userRoutes from "./routes/user";
import { CLIENT_URL, MONGOOSE_URL, PORT } from "./constants/constants";
import { redisStore } from "./config/redis";

require("dotenv").config();

const app = express();


mongoose.connect(MONGOOSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: redisStore,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api/users", userRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
