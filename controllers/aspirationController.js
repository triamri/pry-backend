const Aspiration = require('../models/aspirationModel');

module.exports = {
  getAllAspiration = (req, res) => {
    
    Aspiration.find()
      .then((results) => {
        res.status(200).json({
          msg: 'data aspirasi',
          data: results
        })
      })
      .catch(err => console.log(err))

  },
  getUserAspiration = (req, res) => {

    Aspiration.find({
      _id: req.decode.id
    }).then((results) => {
        res.status(200).json({
          msg: 'data aspirasi',
          data: results
        })
      })
      .catch(err => console.log(err))

  },
  detailAspiration = (req, res) => {

    Aspiration.findById(req.params.id)
      .then((result) => {
        res.status(200).json({
          msg: 'detail aspirasi',
          data: result
        })
      })
      .catch(err => console.log(err))

  },
  saveAspiration = (req, res) => {

    let newAspiration = new Aspiration({
      aspiration: req.body.aspiration,
      userID: req.decode.id
    });

    newAspiration.save()
      .then((data) => {
        res.status(200).json({
          msg: 'data berhasil disimpan',
          data: data
        })
      })
      .catch(err => console.log(err))

  },
  publishAspiration = (req, res) => {

    let publish = {
      publish: 'Y'
    }

    Aspiration.findByIdAndUpdate(req.params.id, publish)
      .then((data) => {
        res.status(200).json({
          msg: 'publish',
          data: data
        })
      })
      .catch(err => console.log(err))

  },
  removeAspiration = (req, res) => {

    Aspiration.remove(req.params.id)
      .then((data) => {
        res.status(200).json({
          msg: 'remove',
          data: data
        })
      })
      .catch(err => console.log(err))

  }
}