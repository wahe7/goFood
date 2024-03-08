const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 5000
const CORS = require("cors");

mongoose.set('strictQuery',false);
// app.enableCors({origin:"*"});
app.use ((req,res, next)=>{
res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept"
)
next();
})
 
app.use(CORS({
  credentials:true,
  origin:'*',
}));
app.use(express.json());

app.use("/api",require("./route/createuser"));
app.use("/api",require("./route/displaydata"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
mongoose.connect("mongodb://127.0.0.1:27017/gofood", async(err, result) => {
  if (err) console.log(err);
  console. log ("connected");
  const fetched_data = await mongoose.connection.db.collection ("food_items");
  fetched_data. find({}).toArray(async function( err, data){

    const foodcategory = await mongoose.connection.db.collection ("food_cat");
    foodcategory.find({}).toArray(function(err,catData){
      if(err) console.log(err);
      else{
        global.food_items=data;
        global.foodcategory=catData;
      }
    })
  // if(err) console. log(err);
  // else{
  //   global.food_items=data;
    
    
  // } 
})
}
)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 