import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import refreshTokenRoute from "./refreshToken.route";
import authMiddleware from "../middlewares/auth.middleware";
import disburseRoute from "./disburse.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", authMiddleware, userRoute);
router.use("/refresh", refreshTokenRoute);
router.use("/disbursement", authMiddleware, disburseRoute);

export default router;
