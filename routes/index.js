import organizationsRoute from './organizationRoute.js';
// import employeesRoute from './employeesRoute.js';
// import attendanceRoute from './attendanceRoute.js';

const mountRoutes = (app) => {
    app.use('/api/organizations', organizationsRoute);
    // app.use('/api/employees', employeesRoute);
    // app.use('/api/attendance', attendanceRoute);
};

export default mountRoutes;