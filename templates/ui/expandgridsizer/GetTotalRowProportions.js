var GetTotalRowProportions = function () {
    var result = 0, proportion;
    for (var i = 0, cnt = this.rowCount; i < cnt; i++) {
        proportion = this.rowProportions[i];
        if (proportion > 0) {
            result += proportion;
        }
    }
    return result;
}

export default GetTotalRowProportions;