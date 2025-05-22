const { Category } = require('../model/Category.model.js');
const { User } = require('../model/User.model.js');
const bcrypt = require('bcryptjs')

exports.fetchUserById = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await User.findById(id);
        res.status(200).json({id:user.id,addresses:user.addresses,email:user.email,role:user.role});
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const {password} = req.body
        const hashPassword  = await bcrypt.hash(password,10)
        const user = await User.findByIdAndUpdate(id, {...req.body,password:hashPassword}, { new: true });
        
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
  }
};