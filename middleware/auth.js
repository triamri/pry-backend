const jwt = require('jsonwebtoken');
const Users = require('../models/usersModel');

const authUser = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded) => {
    if (!decoded) {
      res.status(403).json({
        msg: 'maaf anda tidak di izinkan'
      })
    }
    req.decoded = decoded;
    next()
  });
}

const authAdmin = (req, res, next) => {
  Users.findById(req.decoded.id)
    .then((data) => {
      if (!data) {
        res.status(403).json({
          msg: 'User Tidak Ada'
        })
      } else if (data.role !== 'admin') {
        res.status(403).json({
          msg: 'Bukan Admin'
        })
      } else {
        next();
      }
    })
}

module.exports = {
  authUser,
  authAdmin
}
