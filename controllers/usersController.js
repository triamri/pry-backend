const Users = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// const signUp = (req, res) => {

//   let newUser = new Users({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//     contact: req.body.contact,
//     address: req.body.address
//   });

//   newUser.save()
//     .then((data) => {
//       res.status(200).json({
//         msg: 'signup berhasil',
//         data: data
//       })
//     })
//     .catch(err => console.log(err))

// }

const signIn = (req, res) => {

  let email = req.body.email;

  Users.find({
    email: email
  }).then((dataUser) => {
    if (dataUser.length === 0) {
      let newUser = new Users({
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo || 'https://www.jainsusa.com/images/store/landscape/not-available.jpg'
      });
    
      newUser.save()
        .then((data) => {
          jwt.sign({
            id: data._id,
            email: data.email
          }, process.env.SECRET_KEY, (err, token) => {
            res.status(200).json({
              access_token: token
            })
          });
        })
    }

    jwt.sign({
      id: dataUser[0]._id,
      email: dataUser[0].email
    }, process.env.SECRET_KEY, (err, token) => {
      res.status(200).json({
        access_token: token
      })
    });

  })
  .catch(err => console.log(err))

}

const updateUser = (req, res) => {

  let updateUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contact: req.body.contact,
    address: req.body.address
  }
  Users.findByIdAndUpdate(req.decoded.id, updateUser)
    .then((data) => {
      res.status(200).json({
        msh: 'update sukses',
        data: data
      })
    })
    .catch(err => console.log(err))

}

const detailUser = (req, res) => {
  
  Users.findById(req.decoded.id)
    .then((data) => {
      res.status(200).json({
        msg: 'data user',
        data: data
      })
    })
    .catch(err => console.log(err))

}

const AllUsers = (req, res) => {
  
  Users.find({
    role: 'user'
  })
    .then((results) => {
      res.status(200).json({
        msg: 'data user',
        data: results
      })
    })
    .catch(err => console.log(err))

}

const changePassword = (req, res) => {
  
  Users.findById(req.decoded.id)
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

}

const removeuser = (req, res) => {

  Users.remove({
    _id: req.params.id
  }).then((data) => {
    res.status(200).json({
      msg: 'data user terhapus',
      data: data
    })
  })
  .catch(err => console.log(err))

}

module.exports = {
  // signUp,
  signIn,
  detailUser,
  changePassword,
  updateUser,
  AllUsers,
  removeuser
}