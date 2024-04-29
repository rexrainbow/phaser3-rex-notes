var RegisterRandomExpression = function (eventSheetManager) {
    eventSheetManager.addExpression('random', function (a, b) {
        if ((a === undefined) && (b === undefined)) {
            a = 0;
            b = 1;
        } else if (b === undefined) {
            b = a;
            a = 0;
        }
        return a + Math.random() * (b - a);
    })
}

export default RegisterRandomExpression;