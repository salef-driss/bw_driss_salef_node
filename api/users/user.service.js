const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) =>{
        pool.query(
            `insert into User(first_Name, last_Name, gender, city , street, houseNr, phoneNr) 
            values(?,?,?,?,?,?,?)`, 
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.city,
                data.street,
                data.houseNr,
                data.phoneNr
            ],
            (error, results, fields) =>{
                if(error){
                  return  callBack(error);
                }

                return callBack(null,results);
            }
            
        ); 
    },

    getUsers: callBack => {
        pool.query(
          "select id,first_Name, last_Name, gender, city , street, houseNr, phoneNr from User",
           [] ,
           (error,results,fields) => {
                if(error){
                   return callBack(error); 
                }
                return callBack(null,results); 
           } 
        );
    },

    getUserByUserId:(id,callBack)=>{
        pool.query(
            `select id, first_Name, last_Name, gender, city , street, houseNr, phoneNr from User where id = ?`,
            [id],
            (error,result,fields)=>{
                if(error){
                    callBack(error); 
                }
                return callBack(null,result[0]); 
            }
        )
    }, 

    updateUser: (id,data, callBack) =>{
        pool.query(
            `update User set first_Name=?, last_Name=?, gender=?, city=?, street=?, houseNr=?, phoneNr=? where id = ?`, 
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.city,
                data.street,
                data.houseNr,
                data.phoneNr,
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


    deleteUser: (id,callBack)=>{
        pool.query(
            "delete from User where id = ?", 
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