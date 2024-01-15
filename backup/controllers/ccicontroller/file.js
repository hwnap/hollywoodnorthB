const File = require('../../model/ccimodel/file');

exports.getFilesForCategory = async (req, res) => {
    try {
        const files = await File.find({ category: req.params.categoryId });
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createFile = async (req, res) => {
    const { name, notes, pictureLinks } = req.body;
    const newFile = new File({
        classicCar: req.params.classicCarId,
        category: req.params.categoryId, // Automatically associate with classicCar and category
        name,
        notes,
        pictureLinks
    });

    try {
        const savedFile = await newFile.save();
        res.status(201).json(savedFile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




exports.updateFile = async (req, res) => {
    try {
        const updatedFile = await File.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFile) {
            return res.status(404).json({ message: "File not found" });
        }
        res.status(200).json(updatedFile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const file = await File.findByIdAndDelete(req.params.id);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
