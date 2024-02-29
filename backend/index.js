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

app.get('/', (req, res) => {
  res.send('Hello World!')
})
mongoose.connect("mongodb://127.0.0.1:27017/gofood", async(err, result) => {
  if (err) console.log(err);
  console. log ("connected");
  const fetched_data = await mongoose.connection.db.collection ("food_items");
  fetched_data. find({}).toArray(function( err, data){
  if(err) console. log(err);
  else console. log();
})
}
)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})