var mongoose = require('mongoose')
var Schema = mongoose.Schema

var leetcodeSubmissionSchema = new Schema({
    problemNumber: Number,
    link: String,
    submitter: String
})

var LeetcodeSubmission = mongoose.model('LeetcodeSubmission', leetcodeSubmissionSchema)

module.exports = LeetcodeSubmission
