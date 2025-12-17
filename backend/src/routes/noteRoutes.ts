import express from 'express';
import {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
} from '../controllers/noteController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken); // Apply authentication middleware to all routes

router.post('/', createNote);
router.get('/', getNotes);
router.delete('/:id', deleteNote);
router.put('/:id', updateNote);

export default router;