const db = require('../db/connections');


const newRoles = (role) => {

    const params = [role.title, role.salary, role.department_id];
    db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`, params, (err, res) => {
        if (err) throw err;
        return;
    })

}

const newEmployees = (employee) => {
    const params = [employee.first_name, employee.last_name, employee.role_id, employee.manager_name];
    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_name) VALUES(?,?,?,?)`, params, (err, res) => {
        if (err) throw err;
        return err;
    })
}

const newDepartments = (department) => {
    const params = [department.title];
    db.query(`INSERT INTO departments (title) VALUES (?)`, params, (err, res) => {
        if (err) throw err;
        return;
    })
}

module.exports = { newRoles, newEmployees, newDepartments };