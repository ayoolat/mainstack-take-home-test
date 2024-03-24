import express, { Router, Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth";
import { AuthController } from "../controller/auth";
import { Authenticate } from "../middlewares/authenticate";

const router = express.Router();
const authService = new AuthService();
const authController: AuthController = new AuthController(authService);

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  authController.login(req, res, next);
});

export default (app: Router) => app.use("/auth", router);
