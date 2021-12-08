const db = require('../db/connections');

const updateRole = (answer) => {
    const sql = `UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name = ?`
    const params = [answer.role, answer.firstName, answer.lastName]
    db.query(sql, params, (err, res) => {
        if (err) throw err;
        return;
    })
}

module.exports = {updateRole};
