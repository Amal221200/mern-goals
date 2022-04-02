const { validationResult } = require('express-validator')
// const asyncHandler = require('express-async-handler');
const Goal = require('../models/GoalShcema');

// @desc Get goals
// route GET /api/goals/
// access Private
const getGoals = async (req, res) => {
    try {
        const { id } = req.user
        const goals = await Goal.find({ user: id })
        res.status(200).json(goals)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
}

// @desc Set goals
// route POST /api/goals/
// access Private
const setGoal = async (req, res) => {
    // Error in validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const goal = await Goal.create({
            user: req.user.id,
            text: req.body.text
        })
        res.status(200).json(goal)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
}

// @desc Update goal
// route PUT /api/goals/:id
// access Private
const updateGoal = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        let goal = await Goal.findById(req.params.id);
        if (!goal) { return res.status(404).json({ message: 'Not found' }) }
        
        if (goal.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }
        const newGoal = { text: req.body.text }

        goal = await Goal.findByIdAndUpdate(req.params.id, { $set: newGoal }, { new: true })
        res.status(200).json(goal)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
}

// @desc Delete goals
// route DELETE /api/goals/:id
// access Private
const deleteGoal = async (req, res) => {
    try {
        let goal = await Goal.findById(req.params.id);

        if (!goal) { return res.status(404).json({ message: 'Not found' }) }

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        goal = await Goal.findByIdAndDelete(req.params.id)
        res.status(200).json(goal)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
}




module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}