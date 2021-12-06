const db = require('../db/connections');

const getDepartments = () => {
    const departmentsArr = [];

    db.query(`SELECT * FROM departments`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            departmentsArr.push(rows[i]);
        }
    })
    return departmentsArr;
    
}

const getEmployees = () => {
    const employeesArr = [];

    db.query(`SELECT * FROM employees`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            employeesArr.push(rows[i]);
        }
    })
    return employeesArr;
    
}

const getRoles = () => {
    const rolesArr = [];

    db.query(`SELECT * FROM roles`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            rolesArr.push(rows[i]);
        }
    })
    return rolesArr;
    
}

module.exports = {getDepartments, getEmployees, getRoles};