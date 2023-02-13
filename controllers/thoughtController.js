const { Thought, User, Types } = require('../models');


  // Get all thoughts
  const ThoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
    .select("-__v")
    .sort({_id: -1})
    .then((thoughtsData) => res.json(thoughtsData))
    .catch((err) => { 
    console.log(err);
    res.status(500).json(err);
  });
},
  // Get a single thought
  getSingleThought({params}, res) {
    Thought.findOne({ _id: params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought({params, body}, res) {
    Thought.create(req.body)
      .then(({_id}) => {
        return Users.findOneAndUpdate({_id: params.userId}, {$push:{thoughts: _id}}, {new: true});
      })
      .then(userData => {
        if(!userData) {
            res.status(404).json({message: 'No user with this particular ID!'});
            return;
        }
        res.json(userData)
    })
    .catch(err => res.json(err)); 
  },
  // Delete a thought
  deleteThought({params}, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((thoughtsData) => {
        if (!thoughtsData) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
      return User.findOneAndUpdate(
        { _id: params.username},
        { $pull: { thoughts: params.thoughtId} },
        {new: true}
      );
    })
    .then(userData => {
        res.json(userData);
    })
    .catch(err => res.json(err));
},
  // Update a thought
  updateThought({params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(thoughtsData => {
         if (!thoughtsData) {
        return res.status(404).json({ message: 'No thought with this id!' })
         }
         res.json(thoughtsData)
        })
      .catch((err) => res.status(500).json(err));
  },

  addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push:{reactions: body }},
      { new: true }
    )
      .then(userData => {
         if (!userData) {
        return res.status(404).json({ message: 'No user with this id!' })
         }
         res.json(userData)
        })
      .catch((err) => res.json(err));
  },

  deleteReaction({params}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull:{reactions: {reactionId: params.reactionId} } },
      { new: true }
    )
      .then(userData => {
         res.json(userData)
        })
      .catch((err) => res.json(err));
  },
};

module.exports = ThoughtController 
