export const UserRoleEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN:'project-admin',
    MEMBER: 'member'
}

export const AvailableUserRoles = Object.values(UserRoleEnum)

// ? testing the results of available user roles
console.log(AvailableUserRoles);

export const TaskStatusEnum = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    DONE: "done"
}

export const TaskStatus = Object.values(TaskStatusEnum)

// ? testing the results of Task Status
console.log(TaskStatus);
