export const sanitizeOrganization = (organization) => {
    return {
        id: organization._id,
        name: organization.name,
        location: organization.location
    };
};