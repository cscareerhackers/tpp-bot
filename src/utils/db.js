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

module.exports = {
    leetcodeSolution: newLeetcodeSolution
}

