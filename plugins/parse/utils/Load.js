var Load = function (query, startIndex, linesCnt) {
    if (startIndex === undefined) {
        startIndex = 0;
    }
    if (linesCnt === undefined) {
        linesCnt = Infinity;
    }

    var retItems = [];
    var isOnePage = (linesCnt <= 1000);
    var linesInPage = Math.min(linesCnt, 1000);

    return new Promise(function (resolve, reject) {
        var queryPage = function (start_) {
            query
                .skip(start_)
                .limit(linesInPage)
                .find()
                .then(function (results) {
                    retItems.push.apply(retItems, results);
    
                    if (isOnePage || (results.length < linesInPage)) {
                        // Done
                        resolve(retItems);
                    } else {
                        // Query next page
                        queryPage(start_ + linesInPage);
                    }
                })
                .catch(reject);
        };
    
        queryPage(startIndex);
    });
};

export default Load;