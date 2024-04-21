var RegisterRandomExpression = function (eventSheetManager) {
    eventSheetManager.addExpression('random', function () {
        return Math.random();
    })
}

export default RegisterRandomExpression;