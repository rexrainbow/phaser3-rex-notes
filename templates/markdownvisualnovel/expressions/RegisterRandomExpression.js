var RegisterRandomExpression = function (eventSheetManager) {
    eventSheetManager.setData('random', function () {
        return Math.random();
    })
}

export default RegisterRandomExpression;