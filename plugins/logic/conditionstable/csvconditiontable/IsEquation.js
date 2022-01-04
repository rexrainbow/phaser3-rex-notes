var IsEquation = function (s) {
    return (s.indexOf('==') != -1) ||
        (s.indexOf('!=') != -1) ||
        (s.indexOf('>=') != -1) ||
        (s.indexOf('<=') != -1) ||
        (s.indexOf('>') != -1) ||
        (s.indexOf('<') != -1);
};

export default IsEquation;