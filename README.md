# GIS Location Check-in System

A location-based check-in system designed for employee attendance management. This application allows employees to check in and out based on their proximity to an organization’s registered location. The system leverages **MongoDB**, **Express.js**, **GeoJSON**, and **Google API** for handling geolocation data.

## Features

- **Employee Check-in**: Employees can check in by providing their location (latitude and longitude). The system validates whether the employee is within the allowed range (100 meters from the organization’s location).
- **Employee Check-out**: Employees can check out, with the system recording the duration of their work session and the check-out location.
- **Attendance Tracking**: Record and track attendance for each employee, including check-in and check-out times and locations.
- **Location-Based Validation**: Ensure that employees are checking in from within the allowed range of the organization.
- **API Endpoints**: RESTful API endpoints for managing employees and their attendance records.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Geospatial Database**: MongoDB GeoJSON support for storing and querying locations
- **Libraries**: `express-validator` for input validation, `geolib` for calculating distances, `moment.js` for date handling

## Dependencies

- **dotenv**: `^16.5.0` - Loads environment variables from a `.env` file.
- **express**: `^5.1.0` - Web framework for building APIs and applications.
- **express-async-handler**: `^1.2.0` - Helps with handling async requests in Express.
- **express-validator**: `^7.2.1` - Input validation middleware for Express.
- **geolib**: `^3.3.4` - Provides geospatial functions such as distance calculation.
- **moment**: `^2.30.1` - Date manipulation library, used for handling and formatting dates.
- **mongoose**: `^8.13.2` - MongoDB ODM (Object Data Modeling) library.
- **nodemon**: `^3.1.9` - A tool that automatically restarts your application when file changes are detected.

## Environment Variables

Before you start, make sure to set up the following environment variables in your `.env` file.

### Required Variables:

1. **MONGODB_URI**: MongoDB connection string for your MongoDB database.
2. **PORT**: The port on which the server will run (default: 3000).

### Example `.env` file:

```env
MONGODB_URI=mongodb://your_mongo_connection_string
PORT=3000
```

## API Endpoints

### 1. POST /checkin

- **Purpose**: Allows an employee to check in.
- **Body**:
  ```json
  {
    "employeeId": "5f8d0d55b54764421b7156c3",
    "checkinLocation": {
      "coordinates": [-73.935242, 40.73061]
    }
  }
  ```
- **Response**: Success or failure message with check-in details.

### 2. POST /checkout

- **Purpose**: Allows an employee to check out.
- **Body**:
  ```json
  {
    "employeeId": "5f8d0d55b54764421b7156c3",
    "checkOutLocation": {
      "coordinates": [-73.935242, 40.73061]
    }
  }
  ```
- **Response**: Success or failure message with check-out details and work duration.

### 3. GET /attendance/:employeeId

- **Purpose**: Retrieve all attendance records for a specific employee.
- **Response**: List of attendance records with check-in/out times and locations.

### 4. GET /attendance/today/:employeeId

- **Purpose**: Retrieve attendance records for today for a specific employee.
- **Response**: List of today's attendance records.

### 5. GET /attendance/all

- **Purpose**: Retrieve all attendance records for all employees.
- **Response**: List of all attendance records.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/3b7mid/GIS_locationCheckin.git
   cd GIS_locationCheckin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables. You’ll need the following:

   - **MONGODB_URI**: The connection string for MongoDB
   - **PORT**: Port on which the server will run (default: 3000)

4. Start the application:

   ```bash
   npm start
   ```

5. The server will now be running at `http://localhost:3000`.

## Testing

To test the API, you can use tools like **Postman**. Make sure you set up the proper request methods (GET, POST) and provide the required JSON body for POST requests.

## Contributing

We welcome contributions! If you have suggestions, bug fixes, or improvements, feel free to fork the repository and submit a pull request.

## Contact

If you have any questions or suggestions, feel free to open an issue on GitHub or contact us via email at [yabdelhamid705@gmail.com].

## Credits

- **Author**: [Youssef Abdelhamid](https://github.com/3b7mid)
