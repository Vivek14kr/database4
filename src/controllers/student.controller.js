const express = require("express")
const Student = require("../modals/student.modal")
const router = express.Router();

router.post('', async (req, res) => {
    try {
        const student = await Student.create(req.body);

        return res.status(201).send(student);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }
});

router.get('', async (req, res) => {
    try {
        const students = await Student.find()
            .populate('eval_id')
            .populate('user_id')
            .lean()
            .exec();

        return res.status(201).send(students);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }
});
router.get('/evaluation/:evaluation_name', async (req, res) => {
    try {
        const student = await Student.find()
            .populate({
                path: 'eval_id',
                populate: {
                    path: 'topic_ids'
                },
            })
            .populate('user_id')
            .lean()
            .exec();
        let arr = [];
        student.forEach(t => {
            console.log(t.eval_id.topic_ids[0].name);
            if (t.eval_id.topic_ids[0].name === req.params.evaluation_name) {
                arr.push(t.user_id.first_name);
            }
        });

        return res.status(201).send(arr);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate('eval_id')
            .populate('user_id')
            .lean()
            .exec();

        return res.status(201).send(student);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }
});
router.patch('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })
            .lean()
            .exec();

        return res.status(201).send(student);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
            .lean()
            .exec();

        return res.status(201).send(student);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }
});

module.exports = router