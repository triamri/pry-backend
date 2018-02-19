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

/* Users. */
router.get('/all', getAllAspiration);
router.get('/user', getUserAspiration);
router.get('/detail/:id', detailAspiration);
router.post('/', saveAspiration);


/* Users. */
router.put('/update/:id', publishAspiration);
router.delete('/remove/:id', removeAspiration);

module.exports = router;
