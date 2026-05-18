var Query = function(config?: any) {
    if (config.totalLines === undefined) {
        config.totalLines = Infinity;
    }
    if (config.linesPerPage === undefined) {
        config.linesPerPage = 1000;
    }
    config.remainderLines = config.totalLines;

    return QueryNextPage(config);
}

var QueryNextPage = function(config?: any) {
    var query = config.query;
    if (config.startDocRef) {
        query = query[config.startMode](config.startDocRef);
    }

    var lineCount = Math.min(config.remainderLines, config.linesPerPage);
    config.remainderLines -= lineCount;
    return query.limit(lineCount).get()
        .then(function(querySnapshot?: any) {
            var done = (config.remainderLines === 0) || (querySnapshot.size < lineCount);  // Is last page
            if (config.forEachPageCallback) {
                done |= !!config.forEachPageCallback(querySnapshot);
            }

            if (done?: any) {
                var out;
                if (config.resolveCallback) {
                    out = config.resolveCallback();
                }
                return Promise.resolve(out);
            } else {
                config.startDocRef = querySnapshot.docs[querySnapshot.size - 1];
                config.startMode = 'startAfter';
                return QueryNextPage(config);
            }
        })
}

export default Query;