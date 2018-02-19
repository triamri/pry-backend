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
const { authUser, authAdmin } = require('../middleware/auth');

/* users. */
router.post('/signup', signUp);
router.post('/signin', signIn);
router.put('/update', authUser, updateUser);
router.put('/password', authUser, changePassword);
router.get('/detail', authUser, detailUser);

/* admin. */
router.delete('/remove/:id', authUser, authAdmin, removeuser);

module.exports = router;
