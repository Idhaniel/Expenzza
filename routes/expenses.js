const express = require("express");
const router = express.Router();
const {recordExpense, retrieveAllExpenses, retrieveExpense} = require("../controllers/expenses")

router.route('/').get(retrieveAllExpenses).post(recordExpense)
router.route('/:id').get(retrieveExpense)

module.exports = router