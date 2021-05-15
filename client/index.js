'use strict';

module.exports = {
  getEmployeeDetails(client, employeeId) {
    client.getDetails({id: employeeId}, function (err, response) {
      console.log('Employee Details for Employee Id:', employeeId, '\n',
          response);
    });
  }
}
