import { asyncHandler } from './../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiErros.js'
import Note from '../models/Note.model.js'
import { Project } from '../models/Project.model.js'
import mongoose from 'mongoose'
import { ApiResponse } from '../utils/ApiResponse.js'


export const getNotes = asyncHandler(async (req, res) => {
    const { projectId } = await req.params

    const project = await Project.findById(projectId)

    if (!project) {
        return ApiError(404, { message: "Project not found" })
    }

    const notes = await Note.find({
        project: mongoose.Types.ObjectId(projectId)
    }).populate('createdBy', 'username fullName avatar')

    if (!notes) {
        return ApiError(405, { message: "Notes not found" })
    }

    return res
        .status(200)
        .json(new ApiResponse(200, notes, "Notes found successfully"))
})
export const getNoteById = asyncHandler(async (req, res) => {
    const { noteId } = await req.params

    const note = await Note.findaById(noteId)
        .populate('createdBy', 'username fullName avatar')

    if (!note) {
        return ApiError(404, { message: "Note not found" })
    }

    return res
        .status(200)
        .json(new ApiResponse(200, note, "Notes found successfully"))

})

export const createNote = asyncHandler(async (req, res) => {
    const { projectId } = await req.params
    const { content } = await req.body

    const project = await Project.findById(projectId)

    if (!project) {
        return ApiError(404, { message: "Project not found" })
    }

    const note = await Note.create(
        {
            project: mongoose.Types.ObjectId(projectId),
            content,
            createdBy: mongoose.Types.ObjectId(req.user._id)
        }
    )

    const populatedNote = await Note.findById(note._id).populate('createdBy', 'username fullName avatar')

    return res
        .status(200)
        .json(new ApiResponse(200, populatedNote, "Note created successfully"))

})
export const updateNote = asyncHandler(async (req, res) => {
    const { noteId } = await req.params
    const { content } = await req.body

    const note = await Note.findaById(noteId)

    if (!note) {
        return ApiError(404, { message: "Note not found" })
    }

    const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { content },
        { new: true }
    ).populate('createdBy', 'username fullName avatar')

    return res
        .status(200)
        .json(new ApiResponse(200, updatedNote, "Note updated successfully"))

})
export const deleteNote = asyncHandler(async (req, res) => {
    const { noteId } = await req.params
    const note = await Note.findaById(noteId)

    if (!note) {
        return ApiError(404, { message: "Note not found" })
    }

    const deletedNote = await Note.findByIdAndDelete(noteId)

      return res
        .status(200)
        .json(new ApiResponse(200, deletedNote, "Note deleted successfully"))
}) 