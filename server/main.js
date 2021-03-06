//only executed on the server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';
Meteor.startup(() => {
//great place to generate data

//check to see if data exists in the collection
//See if the collection has any records
const numberRecords = Employees.find({}).count();
console.log(numberRecords);
if(!numberRecords) {
  // Generate some data...
  _.times(5000, () => {
    const {name, email, phone} = helpers.createCard();
/*const name = helpers.createCard().name;
    const email = helpers.createCard().email;
    const phone = helpers.createCard().phone;*/

    Employees.insert({
      //if value and key are the same, you can use the below es6 syntax
      name,email,phone,
      avatar: image.avatar()
      /*name:name,
      email: email,
      phone: phone*/
    });
  });
}


Meteor.publish('employees', function(per_page) {
  return Employees.find({}, {limit: per_page});
});
});
