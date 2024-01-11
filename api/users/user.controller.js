const { json } = require("express");
const {create , getUserByUserId, updateUser , getUsers , deleteUser} = require("./user.service"); 


module.exports = {

    //createn van een user
    createUser: (req, res) => {
        const body = req.body;
        create(body,(err , results)=> {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                });
            }

            return res.status(200).json({
                success:1,
                data:results
            }); 
        }); 
    },

    getUserByUserId:(req,res) => {
        const id = req.params.id; 
        getUserByUserId(id, (err, results) => {
            if(err){
                console.log(err); 
                return;
            }

            return res.json({
                success:1,
                data: results
            });
        })
    }, 

    getUsers:(req, res) =>{
        getUsers((err,results) => {
            if(err){
                console.log(err); 
                return;
            }

            return res.json({
                success:1,
                data:results
            });
        });
    }, 

    updateUser:(req,res) =>{
        const body = req.body; 
        const id = req.params.id; 

        updateUser(id,body,(err,results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                });
            }
            
            return res.status(200).json({
                success: 1,
                message: "User updated successfully"
            });
        }); 
    }, 

    deleteUser: (req,res) =>{
        const id = req.params.id; 
        deleteUser(id,(err,results) =>{
            if(err){
                console.log(err); 
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                }); 
            }

            if(!results){
                return res.json({
                    success: 0,
                    message:"Record Not Found"
                })
            }

            return res.status(200).json({
                success: 1,
                message: "User deleted successfully"
            });
        }); 
    }

}