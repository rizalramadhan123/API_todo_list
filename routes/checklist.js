const express = require('express');
const router = express.Router();
const {
  createChecklist,
  deleteChecklist,
  getAllChecklists,
  getChecklistDetails,
  createItem,
  getItemDetails,
  updateItem,
  deleteItem
} = require('../controllers/checklistController');
const authMiddleware = require('../middleware/authMiddleware');

// Buat Checklist
router.post('/checklists', authMiddleware, createChecklist);

// Hapus Checklist
router.delete('/checklists/:id', authMiddleware, deleteChecklist);

// Tampilkan Semua Checklist
router.get('/checklists', authMiddleware, getAllChecklists);

// Detail Checklist
router.get('/checklists/:id', authMiddleware, getChecklistDetails);

// Buat Item
router.post('/checklists/:checklistId/items', authMiddleware, createItem);

// Detail Item
router.get('/checklists/:checklistId/items/:id', authMiddleware, getItemDetails);

// Ubah Item
router.put('/checklists/:checklistId/items/:id', authMiddleware, updateItem);

// Hapus Item
router.delete('/checklists/:checklistId/items/:id', authMiddleware, deleteItem);

module.exports = router;
