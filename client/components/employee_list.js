import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const per_page = 20;

const EmployeeList = (props) => {
  //props.employees => an array of employee objects?
  //Employee detail scaffolindg |  console.log(props.employees);


console.log(props.employees);

return(
  <div>
  <div className="employee-list">
      { props.employees.map(employee => <EmployeeDetail key={employee._id} employee={employee} />
      )}
      </div>

      <button onClick={() => Meteor.subscribe('employees', 40)} className="btn btn-primary"> Load More... </button>
      </div>

);

};

export default createContainer(() => {
//set up subscription

//modifying the second argument below will pass arguments to the subscription function
Meteor.subscribe('employees' , per_page);

//return an object. Whatever we return will be sent to EmployeeList
//as props
return { employees: Employees.find({}).fetch() };

}, EmployeeList);
