var RegisterRandomIntExpression = function(eventSheetManager?: any) {
    eventSheetManager.addExpression('randomInt', function(a?: any, b?: any) {
        return Math.floor(a + Math.random() * (b - a + 1));
    })
}

export default RegisterRandomIntExpression;