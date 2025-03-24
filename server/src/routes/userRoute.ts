import { Router } from "express";
import {
    createUser,
    getUser,
} from "../controllers/userController";

const router = Router()

router.route('/create').post(createUser)
router.route('/get/:email').get(getUser)

export default router;