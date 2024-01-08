const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) =>{
        pool.query(
            `insert into registration(first_Name, last_Name, gender, city , street, houseNr, phoneNr) 
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
    }
}