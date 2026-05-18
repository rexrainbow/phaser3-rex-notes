import FindFirst from '../utils/query/FindFirst';

var GetRank = function(userID?: any) {
    if (userID === undefined) {
        userID = this.userID;
    }

    var query = this.getPageQuery().next;
    var testCallback = function(doc?: any) {
        var item = doc.data();
        return (item.userID === userID);
    }
    return FindFirst(query, testCallback)
        .then(function(result?: any) {
            return Promise.resolve({ userID: userID, rank: result.index });
        })
};


export default GetRank;