var Load = function (query, startIndex, totalLineCount) {
    if (startIndex === undefined) {
        startIndex = 0;
    }
    if (totalLineCount === undefined) {
        totalLineCount = Infinity;
    }

    return LoadNextPage(query, totalLineCount, startIndex, []);
};

var LoadNextPage = function (query, totalLineCount, startIndex, resultItems) {
    var lineCount = Math.min(totalLineCount, 1000);
    totalLineCount -= lineCount;
    return query.skip(startIndex).limit(lineCount).find()
        .then(function (items) {
            resultItems.push(...items);

            if ((totalLineCount === 0) || (items.length < lineCount)) { // Is last page
                return Promise.resolve(resultItems);
            } else {
                var nextStartIndex = startIndex + items.length;
                return LoadNextPage(query, totalLineCount, nextStartIndex, resultItems);
            }
        })

}
export default Load;