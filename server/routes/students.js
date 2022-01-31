const express = require("express");
const router = express.Router();
const studentController=require("../controllers/studentsControllers");


//View All Record
router.get("/",studentController.view);

//Add New Record
router.get("/adduser",studentController.adduser);
router.post("/adduser",studentController.save);

//Update Existing Record
router.get("/edituser/:id",studentController.edituser);
router.post("/edituser/:id",studentController.update);

//Delete Record
router.get("/deleteuser/:id",studentController.delete);


module.exports=router;