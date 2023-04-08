const employeeList = {
   employees: [
      {
         id: 1,
         emplID: "EMP012",
         position: "Sr. Warden",
         location: "Test Lab",
         firstName: "Neeraj",
         lastName: "Jain",
         phone: "9900223234",
         imgUrl: "assets/employee_1.jpeg",
         tasks: [
            {
               id: "EMP012-01", 
               assignment: "Blood Sample Report",
               from: '2:30',
               to: '3:00',
               realTime: "02:00",
               timePeriod: "1 hr",
               status: "inProgress",
               remark: "Staff is not sufficent"
            },
            {
               id: "EMP012-02", 
               assignment: "X-Ray Report",
               from: '5:30',
               to: '6:00',
               realTime: "03:00",
               timePeriod: "1 hr",
               status: "completed",
               remark: "Only one oxygen cylender left"
            }
         ]
      },
      {
         id: 2,
         emplID: "EMP013",
         position: "Warden",
         location: "X-Ray Room",
         firstName: "Suresh",
         lastName: "Shukals",
         phone: "9900223234",
         imgUrl: "assets/employee_2.jpeg",
         tasks: [
            {
               id: "EMP013-01", 
               assignment: "X-Ray Report",
               from: '1:30',
               to: '3:00',
               realTime: "03:00",
               timePeriod: "1 hr",
               status: "completed",
               remark: "Only one oxygen cylender left"
            }
         ]
      },
      {
         id: 3,
         emplID: "EMP014",
         position: "Clerk",
         location: "Blood Bank",
         firstName: "Vinita",
         lastName: "Dasai",
         phone: "9900223234",
         imgUrl: "assets/employee_3.jpeg",
         tasks: [
            {
               id: "EMP014-01", 
               assignment: "Visit Blood Bank",
               from: '4:30',
               to: '5:00',
               realTime: "04:00",
               timePeriod: "1 hr",
               status: "delay",
               remark: "Requirement is not clear"
            }
         ]
      }
   ]
}

exports.employeeList = employeeList