const Aspiration = require('../models/aspirationModel');

const getAllAspiration = (req, res) => {
  
  Aspiration.find({
    publish: 'Y'
  })
  .populate('userID')
  .then((results) => {
    res.status(200).json({
      msg: 'data aspirasi',
      data: results
    })
  })
  .catch(err => console.log(err))

}

const getCekAspiration = (req, res) => {
  
  Aspiration.find({
    publish: 'N'
  })
  .populate('userID')
  .then((results) => {
    res.status(200).json({
      msg: 'data aspirasi',
      data: results
    })
  })
  .catch(err => console.log(err))

}

const getUserAspiration = (req, res) => {

  Aspiration.find({
    userID: req.decoded.id,
    publish: 'Y'
  })
  .populate('userID')
  .then((results) => {
      res.status(200).json({
        msg: 'data aspirasi',
        data: results
      })
    })
  .catch(err => console.log(err))

}

const detailAspiration = (req, res) => {

  Aspiration.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        msg: 'detail aspirasi',
        data: result
      })
    })
    .catch(err => console.log(err))

}

const saveAspiration = (req, res) => {

  Aspiration.find({
    userID: req.decoded.id,
    create_at: { $lte: new Date() }
  })
    .then((result) => {
      if (result.length === 0) {
        let newAspiration = new Aspiration({
          aspiration: req.body.aspiration,
          userID: req.decoded.id
        });
  
        newAspiration.save()
          .then((data) => {
            res.status(200).json({
              msg: 'data berhasil disimpan',
              error: true,
              data: data
            })
          })      
      } else {
        res.status(200).json({
          msg: 'maaf, Anda Sudah Mengirimkan Aspiration Hari Ini',
          error: false
        })
      }


    })
    .catch(err => console.log(err))
}

const publishAspiration = (req, res) => {

  let publish = {
    publish: req.body.publish
  }

  Aspiration.findByIdAndUpdate(req.params.id, publish)
    .then((data) => {
      res.status(200).json({
        msg: 'publish',
        data: data
      })
    })
    .catch(err => console.log(err))

}

const removeAspiration = (req, res) => {

  Aspiration.remove({
    _id: req.params.id
  })
    .then((data) => {
      res.status(200).json({
        msg: 'remove',
        data: data
      })
    })
    .catch(err => console.log(err))

}

module.exports = {
  getAllAspiration,
  getCekAspiration,
  getUserAspiration,
  detailAspiration,
  saveAspiration,
  publishAspiration,
  removeAspiration
}