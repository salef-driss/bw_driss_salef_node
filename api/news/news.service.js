const pool = require("../../config/database");

module.exports = {
    createNews: (data, callBack) =>{
        pool.query(
            `insert into News(title, content, author, date) 
            values(?,?,?,?)`, 
            [
                data.title,
                data.content,
                data.author,
                data.date,
            ],
            (error, results, fields) =>{
                if(error){
                  return  callBack(error);
                }

                return callBack(null,results);
            }
            
        ); 
    },

    getAllNews: callBack => {
        pool.query(
          "select id,title, content, author, date from News",
           [] ,
           (error,results,fields) => {
                if(error){
                   return callBack(error); 
                }
                return callBack(null,results); 
           } 
        );
    },

    getNewsByUserId:(id,callBack)=>{
        pool.query(
            `select id, title, content, author, date from News where id = ?`,
            [id],
            (error,result,fields)=>{
                if(error){
                    callBack(error); 
                }
                return callBack(null,result[0]); 
            }
        )
    }, 

    updateNews: (id,data, callBack) =>{
        pool.query(
            `update News set title=?, content=?, author=?, date=? where id = ?`, 
            [
                data.title,
                data.content,
                data.author,
                data.date,
                id
            ],
            (error, results, fields) =>{
                if(error){
                  return  callBack(error);
                }

                return callBack(null,results);
            }   
        ); 
    },

    deleteNews: (id,callBack)=>{
        pool.query(
            "delete from News where id = ?", 
            [id],
            (error , results, fields) =>{
                if(error){
                  return callBack(error); 
                }
                return callBack(null,results); 
            }
        )
    }


}