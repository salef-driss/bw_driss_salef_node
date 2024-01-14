const { json } = require("express");
const {create , getUserByUserId, updateUser , getUsers , deleteUser , advancedSearch , advancedOrder , getUsersWithLimitAndOffset,searchUserByFirstName} = require("./user.service"); 
const validateUserData = require('../validation/userValidation');


module.exports = {
    //createn van een user
    //POST: http://localhost:3000/api/users
    /*
        {
            "first_name": "Cederick",
            "last_name": "mmm",
            "gender": "man",
            "city": "Halle",
            "street": "dilbeek",
            "houseNr": 45,
            "phoneNr": "+32 444 33 42 48"
        }
    */
    createUser:(req, res) => {

        const errors = validateUserData(req.body);
        if(errors){
            return res.status(400).json({errors}); 
        }

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

    //gaat 1 user ophalen
    //GET:http://localhost:3000/api/users/{id}
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

    // gaat alle users ophalen
    //GET: http://localhost:3000/api/users
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

    // Gaat een user updaten 
    //PUT:http://localhost:3000/api/users/{id}
    updateUser:(req,res) =>{
        const body = req.body; 
        const id = req.params.id; 

        const errors = validateUserData(body);
        if (errors) {
            return res.status(400).json({ errors });
        }

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

    // Gaat een user deleten 
    // http://localhost:3000/api/users/{id}
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
    },

    // Je kan user oproeken door te filteren op meerdere zaken 
    // zoals first_name , last_name en andere zaken 
    // GET: http://localhost:3000/api/users/search?gender=man&last_name=salef&city=Halle&first_Name=Driss
    advancedSearch: (req, res) => {
        console.log("test")
        const params = req.query;


        advancedSearch(params, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
     },

    // Ordennen van users 
    // GET: http://localhost:3000/api/users/order?field=first_name,street,city&direction=asc

    advancedOrder: (req, res) => {
        const orderField = req.query.field;
        const orderDirection = req.query.direction;
       
        advancedOrder(orderField, orderDirection, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection error"
            });
          }
       
          return res.status(200).json({
            success: 1,
            data: results
          });
        });
    },

    // limit staat voor het max aantal dat hij zal nemen en offset saat voor hoeveel hij er eerst gaat skippen
    //GET: http://localhost:3000/api/users/limit?limit=2&offset=2
    getUsersWithLimitAndOffset: (req, res) => {
        const limit = parseInt(req.query.limit) || 3; 
        const offset = parseInt(req.query.offset) || 3;
        getUsersWithLimitAndOffset(limit, offset, (err, results) => {
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

    //Gaat user sturen met een bepaald firstName 
    //GET: http://localhost:3000/api/users/searchFirstName?searchValue=Driss
    searchOnFirstName : (req, res) => {
        const searchValue = req.query.searchValue;
        console.log('Search Value in searchOnFirstName:', searchValue);

        searchUserByFirstName(searchValue, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
    
            if (results.length === 0) {
                return res.status(404).json({
                    success: 0,
                    message: "No users found with the specified first name"
                });
            }
    
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    }
          
}