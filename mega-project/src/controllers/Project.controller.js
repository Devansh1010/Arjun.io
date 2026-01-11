import { asyncHandler } from './../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiErros.js'
import { Project } from '../models/Project.model.js'
import { User } from '../models/User.model.js'
import mongoose from 'mongoose'
import { ApiResponse } from '../utils/ApiResponse.js'

export const getProjects = asyncHandler(async (req, res) => {
    const { userId } = await req.params

    const user = await Project.findById(userId)

    if (!user) {
        return ApiError(404, { message: "User not found" })
    }

    const projects = await Project.find({
        createdBy: mongoose.Types.ObjectId(userId)
    }).populate('createdBy', 'username fullName avatar')

    if (!projects) {
        return ApiError(405, { message: "Projects not found" })
    }

    return res
        .status(200)
        .json(new ApiResponse(200, projects, "Projects found successfully"))
})

export const getProjectById = asyncHandler(async (req, res) => {

    const { userId, projectId } = await req.params

    //find only those projects that belongs to the user
    const project = await Project.findOne({
        _id: projectId,
        createdBy: userId
    })

    if (!project) {
        return ApiError(404, { message: "Project not found" })
    }

    return res
        .status(200)
        .json(new ApiResponse(200, project, "Project found successfully"))

})

export const createProject = asyncHandler(async (req, res) => {
    const { userId } = await req.params
    const { name, description } = await req.body

    const user = await User.findById(userId)

    if (!user) {
        return ApiError(404, { message: "User not found" })
    }

    const project = await Project.create(
        {
            name,
            description,
            createdBy: mongoose.Types.ObjectId(userId)
        }
    )

    //populate createdBy field
    const populatedProject = await Project.findById(project._id).populate('createdBy', 'username fullName avatar')

    return res
        .status(200)
        .json(new ApiResponse(200, populatedProject, "Project created successfully"))

})

export const updateProject = asyncHandler(async (req, res) => {
    const { projectId } = await req.params
    const { name, description } = await req.body

    const project = await Project.findaById(projectId)

    if (!project) {
        return ApiError(404, { message: "Project not found" })
    }

    const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { name, description },
        { new: true }
    ).populate('createdBy', 'username fullName avatar')

    return res
        .status(200)
        .json(new ApiResponse(200, updatedProject, "Project updated successfully"))

})

export const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = await req.params
    
    const project = await Project.findById(projectId)

    if (!project) {
        return ApiError(404, { message: "Project not found" })
    }

    const deletedProject = await Project.findByIdAndDelete(projectId)

    return res
        .status(200)
        .json(new ApiResponse(200, deletedProject, "Project deleted successfully"))
})
