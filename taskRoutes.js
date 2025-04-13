const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/', taskController.create);
router.get('/', taskController.getAll);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);
router.patch('/:id/complete', taskController.markComplete);
router.post('/import', upload.single('file'), taskController.importCSV);

module.exports = router;
