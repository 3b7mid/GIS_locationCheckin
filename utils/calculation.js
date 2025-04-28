export const calculateDistance = (employeeCoordinates, organizationCoordinates) => {
    // Helper function to convert degrees to radians
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    // Destructure the coordinates into longitude and latitude
    const [employeeLongitude, employeeLatitude] = employeeCoordinates;
    const [organizationLongitude, organizationLatitude] = organizationCoordinates;

    // Radius of the Earth in meters
    const earthRadius = 6371000; 

    // Difference in coordinates
    const deltaLatitude = toRadians(organizationLatitude - employeeLatitude);
    const deltaLongitude = toRadians(organizationLongitude - employeeLongitude);

    // Haversine formula
    const a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
              Math.cos(toRadians(employeeLatitude)) * Math.cos(toRadians(organizationLatitude)) *
              Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance between the two points
    const distance = earthRadius * c; // Result in meters
    return distance;
};

export const calculateDurationTime = (checkinTime, checkoutTime) => {
    const diffInMilliseconds = checkoutTime - checkinTime;
    const durationInHours = diffInMilliseconds / (1000 * 60 * 60);
    
    return parseFloat(durationInHours.toFixed(2));
};