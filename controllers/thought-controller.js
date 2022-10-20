const { Thought, User} = require('../models');

const thoughtController = {
    
getAllThought(req, res) {
    Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
},

getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
},

updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true
    })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
},

addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
    .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true }
        );
    })
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(dbThoughtData);
    })
        .catch(err => res.json(err));
},

begoneThought({ params }, res){
    Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if(!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id' });
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id' });
                return;
            }
                res.json(dbUserData);
            })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController