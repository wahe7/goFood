const express = require('express');
const router = express.Router();
router.post("/fooddata",(req,res)=>{
    try{
        console.log([global.food_items,global.foodcategory]);
        res.send([global.food_items,global.foodcategory]);
    } catch (error){
            console.log(error.message);
            res.send("server error");
    }
})

module.exports=router;