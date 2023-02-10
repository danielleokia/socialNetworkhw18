const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller')

router.route('/').get(getAllThoughts)
// /api/thoughts/:userId
router.route('/:userId').post(addThought);
// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(addThought).delete(removeThought)
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction)

    

module.exports = router;