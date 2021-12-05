const express = require('express');
const router = express.Router();
const db = require('../db/connections');
// const inputCheck = require('../../utils/inputCheck');

router.get('/employee', (req, res) => {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
})

//creates new employee
router.post('/employee', ({ body }, res) => {
    const params = [body.id, body.first_name, body.last_name, body.role_id, body.manager_name];
    const sql = `INSERT INTO employees (id, first_name, last_name, manager_name)
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

router.delete('/employee/:id', ({body}, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [body.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
            // checks if anything was deleted
        } else if (!result.affectedRows) {
            res.json({
                message: 'employee not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: body.id
            });
        }
    });
})

router.put('/employee', ({body}, res) => {
    const params = [body.id, body.first_name]
    const sql = `UPDATE employees
    SET role = ?
    WHERE first_name = ?`;

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

router.put('/employee', ({body}, res) => {
    const params = [body.manager_name, body.first_name]
    const sql = `UPDATE employees
    SET manger_name = ?
    WHERE first_name = ?`;

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