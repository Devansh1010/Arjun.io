import { Router } from "express";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/Task.controller";
import { authenticateUser } from "../middleware/authentication-check.middleware";

const router = Router()

router.route('/:projectId')
    .get(authenticateUser, getTasks)
    .post(authenticateUser, createTask)

router.route('/:projectId/n/:taskId')
    .get(authenticateUser, getTaskById)
    .put(authenticateUser, updateTask)
    .delete(authenticateUser, deleteTask)

export default router