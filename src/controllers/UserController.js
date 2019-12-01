const UserService = require('../services/UserService');


const UserController =  {
    
    LOGIN(req,res){
        UserService.Rules.Login(req.body).then(
            result =>{
                if(result.status === 404){
                   return res.status(404)
                }else{
                   return res.json(result).status(200);
                }
                
            }
        ).catch(
            err =>{
                res.json(err)
            }
        )
    },

    async createUser(req, res){
        res.json(UserService.Rules.createUser(req.body))
    },

    async ADDDEVICE(req,res){
        UserService.Rules.addDevice(req.body).then(
            result =>{
                res.json(result);
            }
        ).catch(err =>{
            res.status(404).json(err)
        })
    }


}


module.exports = UserController;