var schedule = require('node-schedule')
var request = require('request')
var _ = require('lodash');
var props = require('./props')

var questionList, dailyQuestion

function populateQuestionList() {
    questionList = null
    request.get({
        url: props.leetcodeUrl,
        json: true,
        headers: {'User-Agent': 'tpp-bot'}
    }, (err, res, data) => {
        if (err) {
            console.log(err)
            return
        }
        if (res.statusCode >= 200 && res.statusCode < 300) {
            questionList = data
            generateDailyQuestion()
        } else {
            console.log('bad status when pulling leetcode')
        }
    })
}

function generateDailyQuestion() {
    filteredList = questionList.stat_status_pairs
        .filter((m) => m.difficulty.level == 2)
        .filter((m) => m.paid_only == false)
    dailyQuestion = _.sample(filteredList)
}

var repopulate = schedule.scheduleJob('0 0 * * *', populateQuestionList)
populateQuestionList()

module.exports = {
    populate: populateQuestionList,
    questions: function() {
        return questionList
    },
    daily: function() {
        return dailyQuestion
    },
    dailyMessage: function() {
        var name = dailyQuestion.stat.question__title
        var slug = dailyQuestion.stat.question__title_slug
        var acceptancePct = (dailyQuestion.stat.total_acs + 0.0) / dailyQuestion.stat.total_submitted
        msg = `Today's question: https://leetcode.com/problems/${slug}
        Acceptance Rate: ${acceptancePct}`

        return msg
    }
}
