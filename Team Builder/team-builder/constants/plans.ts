export const PLANS = {
    FREE: {
        maxTeams: 2,
        maxMembersPerTeam: 5,
        maxTasksPerTeam: 100,
    },

    PRO: {
        maxTeams: Infinity,
        maxMembersPerTeam: Infinity,
        maxTasksPerTeam: Infinity,
    },
} as const;