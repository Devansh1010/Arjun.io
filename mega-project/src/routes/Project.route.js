import { Router } from "express";
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from "../controllers/Project.controller";
import { authenticateUser } from "../middleware/authentication-check.middleware";

const router = Router()

router.route('/:userId')
    .get(authenticateUser, getProjects)
    .post(authenticateUser, createProject)

router.route('/:userId/n/:projectId')
    .get(authenticateUser, getProjectById)
    .put(authenticateUser, updateProject)
    .delete(authenticateUser, deleteProject)

export default router