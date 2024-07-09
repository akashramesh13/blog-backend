import express from "express";
import {
  register,
  login,
  logout,
  dashboard,
  updateUser,
} from "../controllers/user";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.use(auth);

router.patch("/update", updateUser);
router.post("/logout", logout);
router.get("/", dashboard);

export default router;
