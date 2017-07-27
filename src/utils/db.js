var props = require('./props')
var MongoClient = require('mongodb').MongoClient

function newLeetcodeSolution(solution) {
    MongoClient.connect(props.dbUri, function(err, db) {
        db.collection('leetcode')
            .insertOne(solution)
            .then(function(result) {
                console.log(result)
            })

        db.close()
    })
}

function searchSolution(problem, cb) {
    MongoClient.connect(props.dbUri, function(err, db) {
        cursor = db.collection('leetcode').find(
            {
                number: problem + ''
            }
        )
        cursor.each(function(err, item) {
            if (item != null) {
                cb(item)
            }
        })
    })
}

function drop() {
    MongoClient.connect(props.dbUri, function(err, db) {
        db.collection('leetcode').drop()
    })
}
 
module.exports = {
    addLeetcode: newLeetcodeSolution,
    searchLeetcode: searchSolution,
    drop: drop
}
