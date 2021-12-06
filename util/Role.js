const express = require('express');
const router = express.Router();
const db = require('../db/connections');
// const inputCheck = require('../../utils/inputCheck');

router.get('/role', ({body}, res) => {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
})

//crates new role
router.post('/role', ({ body }, res) => {
    const params = [body.id, body.title, body.salary, body.department_id];
    const sql = `INSERT INTO roles (id, title, salary, department_id)
    VALUES (?,?,?,?)`;

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
})



module.exports = router;