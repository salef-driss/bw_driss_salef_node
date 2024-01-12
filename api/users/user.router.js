const {createUser , getUserByUserId , getUsers, updateUser , deleteUser,advancedSearch,advancedOrder,getUsersWithLimitAndOffset , searchOnFirstName} = require("./user.controller");
const router = require("express").Router();

router.post("/",createUser); 
router.get("/", getUsers); 
router.get("/search", advancedSearch);
router.get("/order", advancedOrder);
router.get("/limit", getUsersWithLimitAndOffset);
router.get("/searchFirstName" , searchOnFirstName);

router.get("/:id", getUserByUserId); 
router.put("/:id", updateUser); 
router.delete("/:id", deleteUser); 





module.exports = router; 