import express from "express";

import userController from "../controller/user.js";
import handleRefreshToken from "../middleware/handle-refresh-token.js"

const router = express.Router();

router.post("/user/auth", userController.authenticate);
router.post("/user/refresh", handleRefreshToken, userController.refresh)
router.post("/user/logout", handleRefreshToken, userController.logout);

export default router;