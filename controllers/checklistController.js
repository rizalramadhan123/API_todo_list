const Checklist = require('../models/Checklist');
const Item = require('../models/Item');


// Buat Checklist
exports.createChecklist = async (req, res) => {
  const { title } = req.body;
  try {
    const checklist = new Checklist({
      title,
      userId: req.user.id,
    });
    
    await checklist.save();
    res.status(201).json(checklist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Hapus Checklist
exports.deleteChecklist = async (req, res) => {
  try {
    await Checklist.findByIdAndDelete(req.params.id);
    await Item.deleteMany({ checklistId: req.params.id });
    res.json({ message: 'Checklist deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Tampilkan Semua Checklist
exports.getAllChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.find({ userId: req.user.id });
    res.json(checklists);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Detail Checklist
exports.getChecklistDetails = async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id);
    const items = await Item.find({ checklistId: req.params.id });
    res.json({ checklist, items });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Buat Item
exports.createItem = async (req, res) => {
  const { description } = req.body;
  try {
    const item = new Item({
      checklistId: req.params.checklistId,
      description,
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Detail Item
exports.getItemDetails = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Ubah Item
exports.updateItem = async (req, res) => {
  const { description, isCompleted } = req.body;
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { description, isCompleted },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Hapus Item
exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
