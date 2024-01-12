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
    }, 

     validateUserData(userData){
        let errors = [];
     
        if (!userData.first_name || !userData.last_name || !userData.gender || !userData.city || !userData.street || !userData.houseNr || !userData.phoneNr) {
            errors.push('All fields must be filled out.');
        }
     
        if (/\d/.test(userData.first_name) ) {
            errors.push('First name cannot contain numbers.');
        }
     
        if(typeof userData.first_name != 'string'){
            errors.push('First name needs to be a string.');
        }
     
        if (/\d/.test(userData.last_name) ) {
            errors.push('Last name cannot contain numbers.');
        }
     
        if(typeof userData.last_name != 'string'){
            errors.push('Last name needs to be a string.');
        }
     
        if(typeof userData.gender != 'string'){
            errors.push("Gender needs to be a string.")
        }
     
        if(typeof userData.city!= 'string'){
            errors.push("City needs to be a string")
        }
     
        if(typeof userData.street != 'string'){
            errors.push("Street needs to be a string")
        }
     
        if ( typeof userData.houseNr === 'string' || isNaN(Number(userData.houseNr))) {
            errors.push('House number must be a number.');
        }
     
        if (!/^\+\d{2} \d{3} \d{2} \d{2} \d{2}$/.test(userData.phoneNr)) {
            errors.push('Phone number needs to be formatted like "+32 444 44 44 44".');
        }
     
        if (errors.length > 0) {
            return errors;
        }
     
        return null;
     },
     

     advancedSearch: (params, callBack) => {
        let query = 'SELECT * FROM User WHERE ';
        let count = 0;
        let values = [];
    
        for (let key in params) {
            if (count !== 0) {
                query += 'AND ';
            }
            query += `${key} LIKE ?`;
            values.push(`%${params[key]}%`);
            count++;
        }
    
        console.log('Query:', query);
        console.log('Values:', values);
    
        pool.query(query, values, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },

    advancedOrder: (orderField, orderDirection, callBack) => {
        let query = `SELECT * FROM User ORDER BY ${orderField} ${orderDirection}`;
       
        pool.query(query, (error, results, fields) => {
          if(error){
            return callBack(error); 
          }
          return callBack(null, results); 
        });
    },
    
    getUsersWithLimitAndOffset: (limit, offset, callBack) => {
        let query = `SELECT * FROM User LIMIT ? OFFSET ?`;
        pool.query(query, [limit, offset], (error, results, fields) => {
            if(error){
                return callBack(error); 
            }
            return callBack(null,results); 
        });
    },

    searchUserByFirstName: (searchValue, callBack) => {
        let query = `SELECT * FROM User WHERE first_name LIKE ?`;
        console.log('Search Value in searchUserByFirstName:', searchValue);

        pool.query(query, [`%${searchValue}%`], (error, results, fields) => {
           if (error) {
            console.log('Error in searchUserByFirstName:', error);

               return callBack(error);
           }
           console.log('Results in searchUserByFirstName:', results);

           return callBack(null, results);
        });
     },
      
     

}