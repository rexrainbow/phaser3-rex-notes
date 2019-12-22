import { TimeTagKeys, ScoreKeys } from './Const.js';

var GetScore = function (userID) {
    if (userID === undefined) {
        userID = this.userInfo.userID;
    }
    var self = this;
    return this.getRecordQuery(this.boardID, this.tag, userID, undefined).limit(1).get()
        .then(function (querySnapshot) {
            var item;
            if (querySnapshot.size > 0) {
                var doc = querySnapshot.docs[0];
                item = doc.data();
            }
            return Promise.resolve(item);
        });
}

export default GetScore;