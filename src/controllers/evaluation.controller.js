const express = require("express")
const Evaluation= require("../modals/evaluation.modal")
const router = express.Router();

router.post('', async (req, res) => {
    try {
        const evaluation = await Evaluation.create(req.body);

        return res.status(201).send(evaluation);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }

});

router.get('', async (req, res) => {
   
    try {
        const evaluations = await Evaluation.find()
            .populate('user_id')
            .populate('topic_ids')
            .lean()
            .exec();
        console.log(res);
        return res.status(201).send(evaluations);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }
});

router.get('/:id', async (req, res) => {
   
    try {
        const evaluation = await Evaluation.findById(req.params.id);
        console.log(res);
        res.status(201).send(evaluation);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const evaluation = await Evaluation.findByIdAndUpdate(
                req.params.id,
                req.body, {
                    new: true,
                }
            )
            .lean()
            .exec();

        return res.status(201).send(evaluation);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const evaluation = await Evaluation.findByIdAndDelete(req.params.id)
            .lean()
            .exec();

        return res.status(201).send(evaluation);
    } catch (e) {

        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });

    }
});

module.exports = router