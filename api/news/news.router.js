const router = require("express").Router();
const {createNews , getAllNews, getNewsByNewsId, updateNews, deleteNews} = require("./news.controller");


router.post("/", createNews); 
router.get("/", getAllNews); 
router.get("/:id", getNewsByNewsId);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);


module.exports = router; 