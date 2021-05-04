const Trip = require('../models/Trip');
const fs = require('fs');

exports.getAllTrips = (req, res, next) => {
  Trip.find()
    .then(trips => res.status(200).json(trips))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneTrip = (req, res, next) => {
  Trip.findOne({ _id: req.params.id })
    .then(trip => res.status(200).json(trip))
    .catch(error => res.status(404).json({ error }));
}

exports.createTrip = (req, res, next) => {
  const tripObject = JSON.parse(req.body.trip);
  delete tripObject._id;
  const trip = new Trip({
    ...tripObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  trip.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyTrip = (req, res, next) => {
  const tripObject = req.file ?
    {
      ...JSON.parse(req.body.trip),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Trip.updateOne({ _id: req.params.id }, { ...tripObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteTrip = (req, res, next) => {
  Trip.findOne({ _id: req.params.id })
    .then(trip => {
      const filename = trip.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Trip.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
