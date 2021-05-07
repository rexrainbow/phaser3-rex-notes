var OnParseBoldTag = function (dynamicText, parser) {
    parser
        .on('+b', function () {
            dynamicText.modifyTextStyle({ bold: true });
        })
        .on('-b', function () {
            dynamicText.modifyTextStyle({ bold: false });
        })
}

export default OnParseBoldTag;