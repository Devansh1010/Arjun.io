import { asyncHandler } from './../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiErros.js'
import { Task } from '../models/Task.model.js'
import { Project } from '../models/Project.model.js'
import mongoose from 'mongoose'
import { ApiResponse } from '../utils/ApiResponse.js'

export const getTasks = asyncHandler(async (req, res) => {
    const { projectId } = await req.params

    const project = await Project.findById(projectId)

    if (!project) {
        return ApiError(404, { message: "Project not found" })
    }

    const tasks = await Task.find({
        project: mongoose.Types.ObjectId(projectId)
    }).populate('createdBy', 'username fullName avatar')

    if (!tasks) {
        return ApiError(405, { message: "Tasks not found" })
    }

    return res
        .status(200)
        .json(new ApiResponse(200, tasks, "Tasks found successfully"))
})
export const getTaskById = asyncHandler(async (req, res) => {
    const { taskId } = await req.params

    const task = await Task.findaById(taskId)
        .populate('createdBy', 'username fullName avatar')

    if (!task) {
        return ApiError(404, { message: "Task not found" })
    }

    return res
        .status(200)
        .json(new ApiResponse(200, task, "Notes found successfully"))

})

export const createTask = asyncHandler(async (req, res) => {
    const { projectId, userId } = await req.params
    const { title, description, assignedTo, status, attachments } = await req.body

    const project = await Project.findById(projectId)

    if (!project) {
        return ApiError(404, { message: "Project not found" })
    }

    const task = await Task.create(
        {
            project: mongoose.Types.ObjectId(projectId),
            title,
            description,
            assignedTo,
            assignedBy: userId,
            status,
            attachments,
            createdBy: mongoose.Types.ObjectId(userId)
        }
    )

    const populatedTask = await Task.findById(task._id).populate('createdBy', 'username fullName avatar')

    return res
        .status(200)
        .json(new ApiResponse(200, populatedTask, "Task created successfully"))

})
export const updateTask = asyncHandler(async (req, res) => {
    const { taskId } = await req.params
    const { title, description, assignedTo, status, attachments } = await req.body

    const task = await Task.findaById(taskId)

    if (!task) {
        return ApiError(404, { message: "Task not found" })
    }

    const updatedTask = await Note.findByIdAndUpdate(
        taskId,
        { title, description, assignedTo, status, attachments },
        { new: true }
    ).populate('createdBy', 'username fullName avatar')

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTask, "Task updated successfully"))

})
export const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = await req.params
    const task = await Task.findaById(noteId)

    if (!task) {
        return ApiError(404, { message: "Task not found" })
    }

    const deletedTask = await Note.findByIdAndDelete(taskId)

    return res
        .status(200)
        .json(new ApiResponse(200, deletedTask, "Task deleted successfully"))
}) 