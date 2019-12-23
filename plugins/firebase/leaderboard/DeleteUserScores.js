import Delete from '../utils/query/Delete.js';

var DeleteUserScores = function (userID) {
    if (userID === undefined) {
        userID = this.userInfo.userID;
    }

    var query = this.getRecordQuery(undefined, undefined, userID, undefined);
    return Delete(query);
}

export default DeleteUserScores;