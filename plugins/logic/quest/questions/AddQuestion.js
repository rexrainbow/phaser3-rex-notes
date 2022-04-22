var AddQuestion = function (question) {
    var options = question.options;
    if (options) {
        // Apply key via serial number
        var option;
        for (var i = 0, cnt = options.length; i < cnt; i++) {
            option = options[i];
            if (!option.hasOwnProperty('key')) {
                option.key = `_${i}`;
            }
        }
    }
    if (!question.hasOwnProperty('key')) {
        // Apply key via serial numbers
        question.key = `_${this.questions.length}`;
    }
    var key = question.key;
    if (this.questionMap.hasOwnProperty(key)) {
        this.remove(key);
    }
    this.questions.push(question);
    this.questionMap[key] = question;

    return this;
}

export default AddQuestion;
