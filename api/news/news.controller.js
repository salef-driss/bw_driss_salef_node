const { json } = require("express");
const {createNews , getAllNews , getNewsByUserId , updateNews , deleteNews} = require("./news.service"); 


module.exports = {

    //createn van een news 
    createNews: (req, res) => {
        const body = req.body;
        body.date = new Date().toLocaleDateString(); 
        createNews(body,(err , results)=> {
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

    //get  alle news items

    getAllNews:(req, res) =>{
        getAllNews((err,results) => {
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


    // gaat een news tonen met het zelfde id dat die binnen krijgt 
    getNewsByNewsId:(req,res) => {
        const id = req.params.id; 
        getNewsByUserId(id, (err, results) => {
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

    // updaten van news 
    updateNews:(req,res) =>{
        const body = req.body; 
        const id = req.params.id; 

        updateNews(id,body,(err,results) => {
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

    deleteNews: (req,res) =>{
        const id = req.params.id; 
        deleteNews(id,(err,results) =>{
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