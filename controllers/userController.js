const { User } = require('../models');

const usersController = {

    // Create a new User
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },

    getAllUsers(req, res) {
        User.find({})
            // populate users thoughts
            .populate({ path: 'thoughts', select: '-__v' })
            // populate user friends
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            // .sort({_id: -1})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')

            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No User with this particular ID!' });
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    updateUsers({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No User with this particular ID!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err))
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No User with this particular ID!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.friendId } }, { new: true })
            .populate({ path: 'friends', select: ('-__v') })
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No User with this particular ID!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No User with this particular ID!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    }

};

// Export module users controller
module.exports = usersController; 
