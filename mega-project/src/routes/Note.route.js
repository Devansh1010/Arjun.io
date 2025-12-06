import { Router } from "express";
import { AvailableUserRoles, UserRoleEnum } from "../utils/constants";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/Note.controller";

const router = Router()


router.route('/:projectId')
    .get(validateProjectPermission(AvailableUserRoles), getNotes)
    .post(validateProjectPermission(AvailableUserRoles), createNote)

router
    .route('/:projectId/n/:noteId')
    .get(validateProjectPermission(AvailableUserRoles), getNoteById)
    .put(validateProjectPermission([UserRoleEnum.ADMIN], [UserRoleEnum.PROJECT_ADMIN]), updateNote)
    .delete(validateProjectPermission([UserRoleEnum.ADMIN], [UserRoleEnum.PROJECT_ADMIN]), deleteNote)

export default router