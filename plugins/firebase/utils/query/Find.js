import PageQuery from '../../pagequery/PageQuery.js';

var FindDoc = function (query, testCallback) {
    var pageQuery = new PageQuery({
        itemCount: 1000,
        query: { next: query }
    })
    return FindInNextPage(pageQuery, testCallback);
}

var FindInNextPage = function (pageQuery, testCallback) {
    return pageQuery.loadNextPage()
        .then(function (docs) {
            if (docs.length === 0) { // Can't find item at last page, return -1
                return Promise.resolve({ doc: undefined, index: -1 });
            }

            var doc;
            for (var i = 0, cnt = docs.length; i < cnt; i++) {
                doc = docs[i];
                if (testCallback(doc)) {
                    var index = pageQuery.startItemIndex + i;
                    return Promise.resolve({ doc: doc, index: index });
                }
            }

            return FindInNextPage(pageQuery, testCallback);
        });
}

export default FindDoc;