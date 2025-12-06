import { Router } from "express";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/Task.controller";

const router = Router()

router.route('/:projectId')
    .get(getTasks)
    .post(createTask)

router.route('/:projectId/n/:taskId')
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask)

export default router