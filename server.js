const inquirer = require('inquirer');
const { initial } = require('lodash');
const db = require('./db/connections');
const cTable = require('console.table');





//Questions for interacting with Database
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
        // console.table(departments);
        console.log("you want to view all departments!");
        cTable.table(getDepartments)
        return promptUser();
        
      case "view all roles":
        console.log("you want to view all roles")
        return promptUser();
      case "view all employees":
        console.log("you want to view all employees")
        return promptUser();
      case "add a department":
        console.log("you want to add a department")
        break;
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
