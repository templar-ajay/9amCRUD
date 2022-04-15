//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require("../url")
//create mongo client
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.post("/", (req, res) => {
    let obj = {
        "p_id": req.body.p_id,        
    }
    //connecto to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log("Error in connection:- ", err)
        else {
            let db = conn.db("nodedb")
            db.collection("products").deleteOne(obj,(err)=>{
                if(err)
                    res.json({'delete':'Error :- '+err})
                else
                {
                    console.log("Data deleted")
                    res.json({'delete':'success'})
                }
            })
        }
    })
})
//export router
module.exports = router