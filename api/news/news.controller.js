const { json } = require("express");
const {createNews , getAllNews , getNewsByUserId , updateNews , deleteNews} = require("./news.service"); 
const validateNewsData = require('../validation/newsValidation');


module.exports = {

    //createn van een news 
    //POST: http://localhost:3000/api/news
    /*
        body in postman 
        {
            "title": "TEST",
            "content": "TEST",
            "author": "TEST"
        }
    */
       
    createNews: (req, res) => {

        req.body.date = new Date().toLocaleDateString();

        const errors = validateNewsData(req.body);
        const body = req.body;

        if(errors){
            return res.status(400).json({errors}); 
        }
        
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
    // http://localhost:3000/api/news 
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
    //GET:http://localhost:3000/api/news/{id}
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
    //PUT:http://localhost:3000/api/news/{id}
    updateNews:(req,res) =>{
        const body = req.body; 
        const id = req.params.id; 
        req.body.date = new Date().toLocaleDateString();


        const errors = validateNewsData(body);
        if (errors) {
            return res.status(400).json({ errors });
        }

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
                    message: "News not found"
                });
            }
            
            return res.status(200).json({
                success: 1,
                message: "News updated successfully"
            });
        }); 
    },

    //DELETE: http://localhost:3000/api/news/{id}
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
                message: "News deleted successfully"
            });
        }); 
    } 
}