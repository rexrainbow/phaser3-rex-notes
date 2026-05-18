var Query = function(config?: any) {
    if (config.startIndex === undefined) {
        config.startIndex = 0;
    }
    if (config.totalLines === undefined) {
        config.totalLines = Infinity;
    }
    if (config.linesPerPage === undefined) {
        config.linesPerPage = 1000;
    }
    config.remainderLines = config.totalLines;

    return QueryNextPage(config);
};

var QueryNextPage = function(config?: any) {
    var query = config.query;
    var lineCount = Math.min(config.remainderLines, config.linesPerPage);
    config.remainderLines -= lineCount;
    return query.skip(config.startIndex).limit(lineCount).find()
        .then(function(items?: any) {
            var done = (config.remainderLines === 0) || (items.length < lineCount);  // Is last page
            if (config.forEachPageCallback) {
                done |= !!config.forEachPageCallback(items);
            }

            if (done?: any) {
                var out;
                if (config.resolveCallback) {
                    out = config.resolveCallback();
                }
                return Promise.resolve(out);
            } else {
                config.startIndex += items.length;
                return QueryNextPage(config);
            }
        })
}
export default Query;