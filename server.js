const inquirer = require('inquirer');
const { initial } = require('lodash');
const db = require('./db/connections');
const cTable = require('console.table');
const { getDepartments, getEmployees, getRoles } = require("./util/getTables.js");
const { newDepartments, newEmployees, newRoles } = require("./util/addData.js");
const { } = require("./util/choiceArray");
const { updateRole } = require("./util/updateData");
const Department = require("./lib/Department");
const Employee = require("./lib/Employee");
const Role = require("./lib/Role");


// Array Data for Tables
let departmentsArr = getDepartments();
let employeesArr = getEmployees();
let rolesArr = getRoles();


//Questions for interacting with Database

//adding new department, gathering info
const addDepartment = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the new department?",
      validate: titleInput => {
        if (titleInput) {
          return true;
        } else {
          console.log("Please enter a department name");
          return false;
        }
      }
    }
  ]).then((answer) => {
    const newDepartment = new Department(answer.title);
    //need to add newdepartment into the database as well
    newDepartments(newDepartment);
    //
    departmentsArr = getDepartments();
    return init();
  })
}

//update employee role
const updateEmployeeRole = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the first name of the employee you want to update the role for?",
      validate: fNameInput => {
        if (fNameInput) {
          return true;
        } else {
          console.log("Please enter a first name");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employees last name",
      validate: lNameInput => {
        if (lNameInput) {
          return true;
        } else {
          console.log("Please enter a last name");
          return false;
        }
      }

    },
    {
      type: "input",
      name: "role",
      message: "What is the ID of the new role",
      validate: idInput => {
        if (idInput) {
          return true;
        } else {
          console.log("Please enter a role ID");
          return false;
        }
      }
    }
  ]).then((answer) => {
    updateRole(answer);
    employeesArr = getEmployees();
    console.log("role updated")
    return init();
  })
}

//adding an new role, colleting info
const addRole = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is title of the new role?",
      validate: titleInput => {
        if (titleInput) {
          return true;
        } else {
          console.log("Please enter a title");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "salary",
      message: "What will the salary be for this role?",
      validate: salaryInput => {
        if (salaryInput) {
          return true;
        } else {
          console.log("Please enter a salary");
          return false;
        }
      }

    },
    {
      type: "input",
      name: "departmentID",
      message: "What is the ID for the associated department?",
      validate: idInput => {
        if (idInput) {
          return true;
        } else {
          console.log("Please enter a department ID");
          return false;
        }
      }
    }
  ]).then((answer) => {
    const newRole = new Role(answer.title, answer.salary, answer.departmentID);
    newRoles(newRole);
    rolesArr = getRoles();
    return init();
  })
}

//adding an new employee, collecting info
const addEmployee = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employees first name?",
      validate: fNameInput => {
        if (fNameInput) {
          return true;
        } else {
          console.log("Please enter a first name");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employees last name?",
      validate: lNameInput => {
        if (lNameInput) {
          return true;
        } else {
          console.log("Please enter a last name");
          return false;
        }
      }

    },
    {
      type: "input",
      name: "roleID",
      message: "What is the ID associated with this employees role?",
      validate: idInput => {
        if (idInput) {
          return true;
        } else {
          console.log("Please enter a last name");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "managerName",
      message: "Who is their manager, skip if there is no Manager",
    }
  ]).then((answer) => {
    const newEmployee = new Employee(answer.firstName, answer.lastName, answer.roleID, answer.managerName);
    newEmployees(newEmployee);
    employeesArr = getEmployees();
    return init();
  })
}

//prompt use what they would like to do.
const initpromptUser = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "quit"]
    }
  ]).then((answer) => {
    return answer;
  })
}

function init() {
  initpromptUser().then((answer) => {
    switch (answer.action) {
      case "view all departments":
        // departmentsArr = getDepartments();
        console.table(departmentsArr);
        return init();
      case "view all roles":
        // rolesArr = getRoles();
        console.table(rolesArr);
        return init();
      case "view all employees":
        // employeesArr = getEmployees();
        console.table(employeesArr);
        return init();
      case "add a department":
        console.log("you want to add a department")
        return addDepartment();
      case "add a role":
        console.log("you want to add a role")
        return addRole();
      case "add an employee":
        console.log("you want to add an employee")
        return addEmployee();
      case "update an employee role":
        console.log("you want to update an employee role")
        return updateEmployeeRole();
      case "quit":
        console.log("exiting")
        process.exit();
    }
  })
}
const connect = () => {
  db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
  });

}

connect();
init();





// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Use apiRoutes ??
// app.use('/api', routes);

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });
