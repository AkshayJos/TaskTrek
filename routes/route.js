import express from "express";
import { loginUser, signupController } from "../controller/userController.js";
import { createTodo, deleteTodo, getAllTodos, getTodo, updateTodo } from "../controller/TodoController.js";
import {authenticate, authenticateToken} from '../controller/jwt-controller.js'

const router = express.Router(); 

router.post("/signup", signupController);
router.post('/login', loginUser);

router.get('/getAllTodos',authenticateToken,getAllTodos);
router.get('/getTodo/:id',authenticateToken,getTodo);
router.post('/create', authenticateToken,createTodo);
router.put('/update/:id',authenticateToken,updateTodo);
router.delete('/delete/:id',authenticateToken, deleteTodo);
router.get('/authenticate/:token',authenticateToken,authenticate);


export default router;
