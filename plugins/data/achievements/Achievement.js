class Achievement {
    constructor(keys, items) {
        this.createTestCallback(keys, items);
    }

    createTestCallback(keys, items) {
        // items[0]: level name
        // items[1]: achievement name
        this.name = items[1];

        var conds = [],
            cond;
        // Start from index 2
        for (var i = 2, cnt = items.length; i < cnt; i++) {
            if ((items[i] === '') || (items[i] == null)) {
                continue;
            }
            conds.push(
                getConditionCode(keys[i - 2], items[i])
            );
        }

        cond = (conds.length > 0) ? conds.join('&&') : 'false';
        this.testCallback = new Function('values', 'return ' + cond);
        return this;
    }

    runTest(values) {
        return this.testCallback(values);
    }
}

var isEquation = function (s) {
    return (s.indexOf('==') != -1) ||
        (s.indexOf('!=') != -1) ||
        (s.indexOf('>=') != -1) ||
        (s.indexOf('<=') != -1) ||
        (s.indexOf('>') != -1) ||
        (s.indexOf('<') != -1);
};
var getConditionCode = function (key, value) {
    if (!isEquation(value)) {
        if (isNaN(value)) {
            value = '\'' + value + '\'';
        }

        value = '==(' + value + ')';
    }
    return '(values[\'' + key + '\']' + value + ')';
}
export default Achievement;