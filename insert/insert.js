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
        "p_name": req.body.p_name,
        "p_cost": req.body.p_cost
    }
    //connecto to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log("Error in connection:- ", err)
        else {
            let db = conn.db("nodedb")
            db.collection("products").insertOne(obj,(err)=>{
                if(err)
                    res.json({'insert':'Error :- '+err})
                else
                {
                    console.log("Data inserted")
                    res.json({'insert':'success'})
                }
            })
        }
    })
})
//export router
module.exports = router