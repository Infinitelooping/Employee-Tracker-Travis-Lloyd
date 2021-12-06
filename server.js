const inquirer = require('inquirer');
const { initial } = require('lodash');
const db = require('./db/connections');
const cTable = require('console.table');
const { getDepartments, getEmployees, getRoles } = require("./util/getTables.js");
const { } = require("./util/addData.js");
const { } = require("./util/buildArrary");
const { } = require("./util/updateData");
const Department = require("./lib/Department");
const Employee = require("./lib/Employee");
const Role = require("./lib/Role");


// Array Data for Tables
const departmentsArr = getDepartments();
const employeesArr = getEmployees();
const rolesArr = getRoles();


//Questions for interacting with Database
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
        departmentsArr = getDepartments();
        console.table(departmentsArr);
        return init();
      case "view all roles":
        rolesArr = getRoles();
        console.table(rolesArr);
        return init();
      case "view all employees":
        employeesArr = getEmployees();
        console.table(employeesArr);
        return init();
      case "add a department":
        console.log("you want to add a department")
        return addDepartment();
      case "add a role":
        console.log("you want to add a role")
        break;
      case "add an employee":
        console.log("you want to add an employee")
        break;
      case "update an employee role":
        console.log("you want to update an employee role")
        break;
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
