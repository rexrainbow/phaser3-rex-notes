import PageQuery from '../pagequery/PageQuery.js';

var GetRank = function (userID) {
    if (userID === undefined) {
        userID = this.userInfo.userID;
    }
    var pageQuery = new PageQuery({
        itemCount: 1000,
        query: this.getPageQuery()
    })
    return LoadNextPage(pageQuery, userID);
};

var LoadNextPage = function (pageQuery, userID) {
    return pageQuery.loadNextPage()
        .then(function (docs) {
            if (docs.length === 0) { // Can't find userID at last page, return -1
                return Promise.resolve({ userID: userID, rank: -1 });
            }

            var index = IndexOf(docs, userID);
            if (index !== null) { // Find userID, return (startItemIndex + index)
                index += pageQuery.startItemIndex;
                return Promise.resolve({ userID: userID, rank: index });
            } else { // Can't find userID in this page, try load next page
                setTimeout(function () {
                    return LoadNextPage(pageQuery, userID);
                }, 0);
            }
        })
}

var IndexOf = function (docs, userID) {
    var item;
    for (var i = 0, cnt = docs.length; i < cnt; i++) {
        item = docs[i].data();
        if (item.userID === userID) {
            return i;
        }
    }
    return null;
}


export default GetRank;