import PageQuery from '../../pagequery/PageQuery.js';

var Delete = function (query) {
    var pageQuery = new PageQuery({
        itemCount: 500,
        query: { next: query }
    })
    return DeleteInNextPage(pageQuery);
}

var DeleteInNextPage = function (pageQuery) {
    return pageQuery.loadNextPage()
        .then(function (docs) {
            if (docs.length === 0) { // Last page, task done
                return Promise.resolve();
            }

            var batch = firebase.firestore().batch();
            for (var i = 0, cnt = docs.length; i < cnt; i++) {
                batch.delete(docs[i].ref);
            }

            return batch.commit()
                .then(function () {
                    return DeleteInNextPage(pageQuery);
                });
        });
}

export default Delete;