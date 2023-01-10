var GetTotalColumnProportions = function () {
    var result = 0, proportion;
    for (var i = 0, cnt = this.columnCount; i < cnt; i++) {
        proportion = this.columnProportions[i];
        if (proportion > 0) {
            result += proportion;
        }
    }
    return result;
}

export default GetTotalColumnProportions;