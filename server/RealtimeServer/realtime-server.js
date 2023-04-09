const http = require('http');
const io = require('socket.io'); // v2
const { employeeList } = require('../emp-data');
const PORT = 4000;

function createRealtimeServer(app) {

    const server = http.createServer();
    const ioServer = io(server);

    ioServer.on('connection', (socket) => {
        console.log('A user connected');

        const interval = setInterval(() => {
           socket.emit('employee-list', employeeList)
        }, 5000);

        socket.on('disconnect', () => {
            clearInterval(interval);
            console.log('A user disconnected');
        });
    });

    // Rest APIs
    app.get('/employees', getEmployeeList);
    app.post('/task-add', postAddTask);
    app.post('/task-update', postUpdateTask);

    server.listen(PORT, () => {
        console.log(`Locak Socket Server: http://localhost:${PORT}`);
    });

}


const getEmployeeList = (req, res) =>  {
    res.status(200).send(employeeList);
}

const postAddTask = (req, res) =>  {
    const newEmp = req.body || {};
    const employee = employeeList?.employees.find((emp) => emp?.emplID == newEmp?.emplID);
    newEmp.id = `${employee.emplID}-${employee.tasks.length}`;
    employee.tasks = [newEmp, ...employee.tasks];
    res.send({ msg: 'Task added successfully' });
}

const postUpdateTask = (req, res) =>  {
    const newEmp = req.body || {};
    const employee = employeeList?.employees.find((emp) => emp.emplID === newEmp.emplID);
    const ind = employee.tasks.find((t) => t.id === newEmp.id);
    ind.assignment = newEmp.assignment;
    ind.timePeriod = newEmp.timePeriod;
    ind.status = newEmp.status;
    ind.remark = newEmp.remark;
    res.send({ msg: 'Task updated successfully' });
}

module.exports = createRealtimeServer;