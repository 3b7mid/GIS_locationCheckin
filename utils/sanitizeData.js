export const sanitizeOrganization = (organization) => {
    return {
        id: organization._id,
        name: organization.name,
        location: organization.location
    };
};

export const sanitizeEmployee = (employee) => {
    return {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        organization: employee.organization
    };
};

export const sanitizeAttendance = (attendance) => {
    return {
        id: attendance._id,
        employee: attendance.employee,
        checkInTime: attendance.checkInTime,
        checkInLocation: attendance.checkInLocation,
        checkOutTime: attendance.checkOutTime || null,
        checkOutLocation: attendance.checkOutLocation?.coordinates?.length ? attendance.checkOutLocation : null,
        workDuration: attendance.workDuration || null
    };
};