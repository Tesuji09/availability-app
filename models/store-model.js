const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema({
  manager: String,
  storeName: {type: String, required: true},
  employees: [{name: String,
    sunday: {type: Number, default: 0},
    monday: {type: Number, default: 0},
    tuesday: {type: Number, default: 0},
    wednesday: {type: Number, default: 0},
    thursday: {type: Number, default: 0},
    friday: {type: Number, deafault: 0},
    saturday: {type: Number, default: 0}
  }]
});

StoreSchema.methods.showStoreInfo = function(){
  return {
    manager: this.manager,
    storeName: this.storeName
  }
}

StoreSchema.methods.findEmployee = function(name){
  const employee;
  employees.forEach(function(emp){
    if (employee.name === name){
      employee = employee.name;
    }
  });
  return employee;
}

StoreSchema.methods.showAllEmployees = function(){
  return this.employees
}


const store = mongoose.model('store', StoreSchema)
