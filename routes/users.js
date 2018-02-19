const express = require('express');
const router = express.Router();
const { 
  signIn, 
  signUp, 
  detailUser,
  updateUser,
  changePassword,
  removeuser  
} = require('../controllers/usersController');

/* users. */
router.post('/signup', signUp);
router.post('/signin', signIn);
router.put('/update', updateUser);
router.put('/password', changePassword);
router.get('/detail', detailUser);

/* admin. */
router.delete('/remove/:id', removeuser);

module.exports = router;
