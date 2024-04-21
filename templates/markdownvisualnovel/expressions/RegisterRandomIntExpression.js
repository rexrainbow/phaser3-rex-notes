var RegisterRandomIntExpression = function (eventSheetManager) {
    eventSheetManager.addExpression('randomInt', function (a, b) {
        return Math.floor(a + Math.random() * (b - a + 1));
    })
}

export default RegisterRandomIntExpression;