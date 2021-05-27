const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
    try {
      res.json( await Product.find());
    }
    catch(err){
      res.status(500).json({ message: err});
    }
  };

  exports.getRandom = async (req, res) => {
    try {
      const count = await Product.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Product.findOne().skip(rand);
      if(!dep) res.status(404).json({message: 'Not found'});
      else res.json(dep);
    }
    catch(err){
      res.status(500).json({ message: err });
    }
  };

  exports.getProductById = async (req, res) => {
    try {
      const dep = await Product.findById(req.params.id);
      if(!dep) res.status(404).json({message : 'not found'});
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.postProduct = async (req, res) => {
    const { name, client } = req.body;
    try {
      const NewProduct = new Product({ name: name, client: client});
      await NewProduct.save();
      res.json( await Product.find());
    }
    catch(err){
      res.status(500).json({ message: err });
    }
  };

  exports.putProductById = async (req, res) => {
    const { name, client } = req.body;
    try{
      const dep = await(Product.findById(req.params.id));
      if(dep){
        await Product.updateOne({ _id: req.params.id}, {$set: {name: name, client: client}});
        res.json({ message : 'ok'});
      }
      else res.status(404).json({ message: 'not found'});
    }
    catch(err){
      res.status(500).json({message: err});
    }
  };

  exports.deleteProduct = async (req, res) => {
    try {
      const dep = await(Product.findById(req.params.id));
      if(dep){
        await Product.deleteOne({ _id: req.params.id});
        res.json( await Product.find());
      }
      else  res.status(404).json({ message: 'not found'});
    }
    catch(err){
      res.status(500).json({message : err});
    }
  };