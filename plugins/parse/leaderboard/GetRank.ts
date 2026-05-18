import FindFirst from '../utils/query/FindFirst';

var GetRank = function(userID?: any) {
    if (userID === undefined) {
        userID = this.userID;
    }

    var query = this.getPageQuery();
    var testCallback = function(item?: any) {
        return (item.get('userID') === userID);
    }
    return FindFirst(query, testCallback)
        .then(function(result?: any) {
            return Promise.resolve({ userID: userID, rank: result.index });
        })
};


export default GetRank;