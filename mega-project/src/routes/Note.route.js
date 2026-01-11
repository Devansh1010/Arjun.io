import { Router } from "express";
import { AvailableUserRoles, UserRoleEnum } from "../utils/constants";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/Note.controller";
import { validateProjectPermission } from "../middleware/role-verification.middleware";
import { authenticateUser } from "../middleware/authentication-check.middleware";

const router = Router()


router.route('/:projectId')
    .get(authenticateUser, validateProjectPermission(AvailableUserRoles), getNotes)
    .post(authenticateUser, validateProjectPermission(AvailableUserRoles), createNote)

router
    .route('/:projectId/n/:noteId')
    .get(authenticateUser, validateProjectPermission(AvailableUserRoles), getNoteById)
    .put(authenticateUser, validateProjectPermission([UserRoleEnum.ADMIN], [UserRoleEnum.PROJECT_ADMIN]), updateNote)
    .delete(authenticateUser, validateProjectPermission([UserRoleEnum.ADMIN], [UserRoleEnum.PROJECT_ADMIN]), deleteNote)

export default router