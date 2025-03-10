import { Router } from "express";
import {
    createUser,
    getUser,
} from "../controllers/userController";

const router = Router()

router.route('/').post(createUser)
router.route('/:email').get(getUser)

export default router;