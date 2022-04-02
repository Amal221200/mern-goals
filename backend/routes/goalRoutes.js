const express = require('express');
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const { body } = require('express-validator');
const fetchUser = require('../middleware/fetchUser')
const router = express.Router();


router.route('/').get(fetchUser, getGoals).post(fetchUser, [body('text', 'Enter a text').notEmpty()], setGoal)

router.route('/:id').put(fetchUser, [body('text', 'Enter a text')], updateGoal).delete(fetchUser, deleteGoal)

module.exports = router