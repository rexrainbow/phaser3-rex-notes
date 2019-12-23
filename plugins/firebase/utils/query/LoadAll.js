var LoadAll = function (query) {
    var pageQuery = new PageQuery({
        itemCount: 1000,
        query: { next: query }
    });
    return LoadNextPage(pageQuery, []);
}

var LoadNextPage = function (pageQuery, resultDocs) {
    return pageQuery.loadNextPage()
        .then(function (docs) {
            if (docs.length > 0) {
                resultDocs.push(...docs);
            }
            if (docs.length < pageQuery.itemCount ) {
                return Promise.resolve(resultDocs);
            } else {
                return LoadNextPage(pageQuery, resultDocs);
            }
        });
}

export default LoadAll;