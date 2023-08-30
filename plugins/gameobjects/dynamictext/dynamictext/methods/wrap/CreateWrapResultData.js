var CreateWrapResultData = function (config) {
    var data = {
        callback: undefined,
        start: 0,  // Next start index
        isLastPage: false,  // Is last page
        maxLines: undefined,
        padding: undefined,
        letterSpacing: undefined,
        hAlign: undefined,
        vAlign: undefined,
        children: [],       // Wrap result
        lines: [],          // Wrap result in lines

        // WordWrap
        maxLineWidth: 0,
        linesHeight: 0,
        lineHeight: undefined,

        // VerticalWrap
        maxLineHeight: 0,
        linesWidth: 0,
        lineWidth: undefined,
    }

    return Object.assign(data, config);
}

export default CreateWrapResultData;