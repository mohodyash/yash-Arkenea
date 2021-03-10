const UserService = require('../services/user.service');


exports.getUserById = async function(req, res) {
    try {
      const user = await UserService.getUserById(req.body);
      res.json(user);
    } catch (e) {
       console.log(e) 
    }
  };

  exports.getUsers = async function(req, res) {
    try {
      const user = await UserService.getUsers();
      res.json(user);
    } catch (e) {
       console.log(e) 
    }
  };

  exports.deleteUser = async function(req, res) {
    try {
      const user = await UserService.deleteUser(req.body);
      res.json(user);
    } catch (e) {
       console.log(e) 
    }
  };

exports.createUser = async function(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      console.log(user);
      return user;
    } catch (e) {
       console.log(e) 
    }
  };

exports.updateUser = async function(req, res) {

     console.log(req);
    
    try {
        const user = await UserService.updateUser(req.body);
        console.log(user);
        return user;
      } catch (e) {
         console.log(e) 
      }
}  

