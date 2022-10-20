const router = require('express').Router();
const { 
    addThought,
    begoneThought,
    getAllThought,
    getThoughtById
    } = require('../../controllers/thought-controller');

//router.route('/:userId').post(addThought);

// router.route('/:userId')
//   .post(addThought)
//   .get(getThoughtById)
//   .delete(begoneThought);
//   //.put()

router.route('/')
.get(getAllThought)
.post(addThought);

router.route('/:id')
.get(getThoughtById)
.delete(begoneThought);

module.exports = router;