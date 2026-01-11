import { ProjectMember } from "../models/Project-member.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const validateProjectPermission = (allowedRoles) => {
    return asyncHandler(async (req, res, next) => {
        const { projectId } = req.params;
        const user = req.user;

        const projectMember = await ProjectMember.findOne({
            project: projectId,
            user: user._id
        });

        if (!projectMember) {
            return res.status(403).json(new ApiResponse(403, null, "You are not a member of this project"));
        }

        // Check if the user's role is in the allowedRoles array
        if (!allowedRoles.includes(projectMember.role)) {
            return res.status(403).json(new ApiResponse(403, null, "You do not have permission for this action"));
        }

        req.userRole = projectMember.role;
        next();
    });
};