
const config = require('config');
const express = require("express");
var async = require("async");
const redis = require("redis");
var md5 = require('md5');

const app = express();

app.use(express.json());

let redisConfig = {}
if(process.env.NODE_ENV === 'production') {
    redisConfig = {
        host: process.env.REDIS_HOSTNAME,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    }
} else {
    redisConfig = config.get("redisConfig")
}

const client = redis.createClient(redisConfig);

client.on("connect", () => {
    console.log("Connected to our redis instance!");
});
client.on("error", function (err) {
    console.log("Redis Error " + err);
});


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', config.get("cors"));
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.post("/signin", async (req, res) => {
    // console.log(req.body)
    let data = req.body

    let userId = md5(data.userName)
    let searchTerm = "users:"+userId

    client.hgetall(searchTerm, (err, reply) => {
        if(reply !== null) {
            res.send(reply)
        } else {
            data["score"] = 0
            data["userId"] = userId
            client.hmset(searchTerm,data, (err, reply) => {
                   res.send(data)
            });
        }

    });
});

app.post("/update", async (req, res) => {
    console.log(req.body)
    let data = req.body

    let userId = md5(data.userName)
    let searchTerm = "users:"+userId

    client.hgetall(searchTerm, (err, reply) => {
        if(reply !== null) {
            reply["score"] =parseInt(data["score"], 10) 
            client.hmset(searchTerm,data, (err, reply2) => {
            res.send(reply)
         });
        }
    });
});


app.get("/getLeaderBoard", async (req, res) => {

    let searchPattern = "users*"
    console.log("getLeaderBoard")
    var leaderBoard = [];
    client.keys(searchPattern, function (err, keys) {
        if (err) return console.log(err);
        if(keys){
            console.log("keys", keys)
            async.map(keys, function(key, cb) {
               client.hgetall(key, function (error, value) {
                    if (error) return cb(error);
                    // console.log("value", value["userName"])
                    var user = {};
                    user['userName']=value.userName;
                    user['score']=value.score;
                    cb(null, user);
                }); 
            }, function (error, results) {
               if (error) return console.log(error);
               console.log("sdf");
               if(results.length > 0) {
                    results.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
                    results = results.filter(data=> parseFloat(data.score) !== 0)
               }
               res.json({data:results.slice(0,10)});
            });
        }
    });
});

const port = process.env.PORT || config.get('port')
app.listen(port, () => {
    console.log("running on port :: ",port );
});