let express = require('express');
let app = express();
let cors = require('cors');
let fs = require('fs'); // 引入fs模块
function getJson(url,fn){
    fs.readFile(url,'utf-8',function(err, data) {
        if (err) {
            throw err;
        }
       fn(data);
    });
}
app.use(cors());

app.get('/', function (req,res) {
    getJson("./shops.json",(data)=>{
        res.send(data.toString());
    })
})
 
let server = app.listen(8881, function () {
  let host = server.address().address
  let port = server.address().port
 
})


