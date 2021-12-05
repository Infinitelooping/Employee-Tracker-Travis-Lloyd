const express = require('express');
const router = express.Router();
const db = require('../db/connections');
// const inputCheck = require('../../utils/inputCheck');

router.get('/department', (req, res) => {
    const sql = `SELECT * FROM departments`;

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

//crates new department
router.post('/department', ({ body }, res) => {
    const params = [body.id, body.name];
    const sql = `INSERT INTO departments (id, title)
    VALUES (?,?)`;

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

// party delete
router.delete('/deparatment/:id', ({body}, res) => {
    const sql = `DELETE FROM departments WHERE title = ?`;
    const params = [body.title];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
            // checks if anything was deleted
        } else if (!result.affectedRows) {
            res.json({
                message: 'Party not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: body.id
            });
        }
    });
});



module.exports = router;