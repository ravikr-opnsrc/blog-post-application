import express from 'express';
import { getAllUser,signUpData, loginData} from './func.js';
const router = express.Router();

router.get("/", getAllUser);
router.post("/login",loginData);
router.post("/signUp",signUpData);



export default router;