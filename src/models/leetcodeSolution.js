var mongoose = require('mongoose')
var Schema = mongoose.Schema

var leetcodeSchema = new Schema({
    problemNumber: Number,
    link: String,
    submitter: String
})

var LeetcodeSolution = mongoose.model('LeetcodeSolution', leetcodeSchema)

module.exports = LeetcodeSolution
