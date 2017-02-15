import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const per_page = 20;
//All classes must return a render method, which in turn must return some amount of JSX
class EmployeeList extends Component {
  //props.employees => an array of employee objects?
  //Employee detail scaffolindg |  console.log(props.employees);

//see: lifecycle methods
componentWillMount() {
  this.page = 1;
}

  handleButtonClick(){
    Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
    this.page += 1;
  }
render(){

return(
  <div>
  <div className="employee-list">

      { this.props.employees.map(employee => <EmployeeDetail key={employee._id} employee={employee} />
        //inside a class based component, you need 'this' before props.employees.map.
        //this.props initialization occurs in Component constructor
      )}
      </div>

      <button onClick={
//Because the below is a callback, the context must be bound
        this.handleButtonClick.bind(this) } className="btn btn-primary"> Load More... </button>
      </div>

);
}
};

export default createContainer(() => {
//set up subscription

//modifying the second argument below will pass arguments to the subscription function
Meteor.subscribe('employees' , per_page);

//return an object. Whatever we return will be sent to EmployeeList
//as props
return { employees: Employees.find({}).fetch() };

}, EmployeeList);
