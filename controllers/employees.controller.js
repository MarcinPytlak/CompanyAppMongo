const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
    try{
      res.json( await Employee.find().populate('department'));
    }
    catch(err) {
      res.status(500).json({ message: err});
    }
  };

  exports.getRandom = async (req, res) => {
    try {
      const count = await Employee.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Employee.findOne().populate('department').skip(rand);
      if(!dep) res.status(404).json({message: 'Not found'});
      else res.json(dep);
    }
    catch(err){
      res.status(500).json({ message: err });
    }
  };

  exports.getEmployeeById = async (req, res) => {
    try{
      const dep = await (await Employee.findById(req.params.id)).populate('department');
      if(!dep) res.status(404).json({message: 'not found'});
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.postEmployee = async (req, res) => {
    try{
      const { firstName, lastName, department } = req.body;
      const NewEmployee = new Employee({ firstName: firstName, lastName: lastName, department: department});
      await NewEmployee.save();
      res.json( await Employee.find().populate('department'));
    }
    catch(err){
      res.status(500).json({ message: err });
    }
  };

  exports.putEmployeeById = async (req, res) => {
    const { firstName, lastName, department } = req.body;
    try {
    const dep = await(Employee.findById(req.params.id));
    if(dep){
      await Employee.updateOne({ _id : req.params.id}, {$set: {firstName: firstName, lastName: lastName, department: department}});
      res.json({ message : 'Ok'});
    }
    else res.status(404).json({message : 'not found'});
    }
    catch(err){
      res.status(500).json({message: err});
    }
  };

  exports.deleteEmployee = async (req, res) => {
    try {
      const dep = await (Employee.findById(req.params.id));
      if(dep){
        await Employee.deleteOne({ _id: req.params.id});
        res.json( await Employee.find().populate('department'));
      }
      else res.status(404).json({ message : 'not found'});
      }
      catch(err){
        res.status(500).json({message : err});
      }
  };