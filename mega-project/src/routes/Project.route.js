import { Router } from "express";
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from "../controllers/Project.controller";

const router = Router()

router.route('/:userId')
    .get(getProjects)
    .post(createProject)

router.route('/:userId/n/:projectId')
    .get(getProjectById)
    .put(updateProject)
    .delete(deleteProject)

export default router