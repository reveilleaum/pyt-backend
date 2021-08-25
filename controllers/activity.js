const Activity = require('../models/Activity');
const fs = require('fs');

exports.getAllActivities = (req, res, next) => {
  Activity.find()
    .then(activitys => res.status(200).json(activitys))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneActivity = (req, res, next) => {
  Activity.findOne({ _id: req.params.id })
    .then(activity => res.status(200).json(activity))
    .catch(error => res.status(404).json({ error }));
}

exports.createActivity = (req, res, next) => {
  // const activityObject = JSON.parse(req.body.activity);
  // delete activityObject._id;
  // const activity = new Activity({
  //   ...activityObject,
  //   imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  // });
  const activity = new Activity(req.body);
  activity.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyActivity = (req, res, next) => {
  const activityObject = req.file ?
    {
      ...JSON.parse(req.body.activity),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Activity.updateOne({ _id: req.params.id }, { ...activityObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteActivity = (req, res, next) => {
  Activity.findOne({ _id: req.params.id })
    .then(activity => {
      const filename = activity.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Activity.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
