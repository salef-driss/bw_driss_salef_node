function validationNews(newsData){
    let errors = [];

    console.log("title : ",  newsData.title);
    console.log("Content : ",  newsData.content);
    console.log("author : ",  newsData.author);
    console.log("date : ",  newsData.date);


    if (!newsData.title || !newsData.content || !newsData.author || !newsData.date) {
        errors.push('All fields must be filled out.');
    }

    if(typeof newsData.title != 'string'){
        errors.push("Title needs to be a string !");
    }

    if(typeof newsData.content != 'string'){
        errors.push("Content needs to be a string !");
    }    

    if(typeof newsData.author != 'string'){
        errors.push("Author needs to be a string !");
    }

    if(typeof newsData.date != 'string'){
        errors.push("Date needs to be a string !");
    }

    if (errors.length > 0) {
        return errors;
    }

    return null; 
}

module.exports = validationNews; 