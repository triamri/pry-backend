const express = require('express');
const router = express.Router();
const {
  getAllAspiration,
  getUserAspiration,
  detailAspiration,
  saveAspiration,
  publishAspiration,
  removeAspiration
} = require('../controllers/aspirationController');
const { authUser, authAdmin } = require('../middleware/auth');

/* Users. */
router.get('/all', authUser, getAllAspiration);
router.get('/user', authUser, getUserAspiration);
router.get('/detail/:id', authUser, detailAspiration);
router.post('/', authUser, saveAspiration);


/* Users. */
router.put('/update/:id', authUser, authAdmin, publishAspiration);
router.delete('/remove/:id', authUser, authAdmin, removeAspiration);

module.exports = router;
