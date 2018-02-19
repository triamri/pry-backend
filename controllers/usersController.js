const Users = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports = {
  signUp = (req, res) => {

    let newUser = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      address: req.body.address
    });

    newUser.save()
      .then((data) => {
        res.status(200).json({
          msg: 'signup berhasil',
          data: data
        })
      })
      .catch(err => console.log(err))

  },
  signIn = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    Users.find({
      email: email
    }).then((dataUser) => {
      if (!dataUser) {
        res.status(403).json({
          user: false,
          password: false
        })
      }

      if(!bcrypt.compareSync(password, dataUser.password)) {
        res.status(400).json({
          user: true,
          password: false
        })
      }

      jwt.sign({
        id: dataUser._id,
        email: dataUser.email
      }, process.env.SECRET_KEY, (err, token) => {
        res.status(200).json({
          user: true,
          password: true,
          access_token: token
        })
      });

    })
    .catch(err => console.log(err))

  },
  updateUser = (req, res) => {

    let updateUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      contact: req.body.contact,
      address: req.body.address
    }
    Users.findByIdAndUpdate(req.decode.id, updateUser)
      .then((data) => {
        res.status(200).json({
          msh: 'update sukses',
          data: data
        })
      })
      .catch(err => console.log(err))

  },
  detailUser = (req, res) => {
    
    Users.findById(req.decode.id)
      .then((data) => {
        res.status(200).json({
          msg: 'data user',
          data: data
        })
      })
      .catch(err => console.log(err))

  },
  changePassword = (req, res) => {
    
    Users.findById(req.decode.id)
      .then((data) => {
        if (!data) {
          res.status(403).json({
            msg: 'user tidak ada'
          })
        }

        if(req.body.password == '') {
          res.status(400).json({
            msg: 'password tidak boleh kosong'
          })
        }
        
        data.password = req.body.password;

        data.save()
          .then((changeData) => {
            res.status(200).json({
              msg: 'password diganti',
              data: data
            })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))

  },
  removeuser = (req, res) => {

    Users.remove({
      _id: req.params.id
    }).then((data) => {
      res.status(200).json({
        msg: 'data user terhapus',
        data: data
      })
    })
    .catch(err => console.log(err))

  },
}