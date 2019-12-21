import GetTime from './GetTime.js';
import { TimeTagKeys, ScoreKeys } from './Const.js';

var Post = function (score, extraData) {
    var newRecord = {
        userID: this.userInfo.userID
    };
    if (this.boardID) {
        newRecord.boardID = this.boardID;
    }
    if (this.userInfo.userName) {
        newRecord.userName = this.userInfo.userName;
    }
    var curTimeData = GetTime();
    for (var t in this.timeFilter) {
        if (!this.timeFilter[t]) {
            continue;
        }
        newRecord[TimeTagKeys[t]] = curTimeData[t];
        newRecord[ScoreKeys[t]] = score;
    }
    if (this.tag) {
        newRecord.tag = this.tag;
    }
    if (extraData) {
        Object.assign(newRecord, extraData);
    }
    var curTimeData = GetTime();
    var self = this;
    return this.getRecordQuery(this.boardID, this.tag, this.userInfo.userID, undefined).limit(1).get()
        .then(function (querySnapshot) {
            var prevRecord, docID;
            querySnapshot.forEach(function (doc) {
                prevRecord = doc.data();
                docID = doc.id;
            });

            if (prevRecord) {
                for (var t in self.timeFilter) {
                    if (!self.timeFilter[t]) {
                        continue;
                    }

                    var timeTagKey = TimeTagKeys[t];
                    if (prevRecord[timeTagKey] === newRecord[timeTagKey]) {
                        var scoreKey = ScoreKeys[t];
                        newRecord[scoreKey] = Math.max(prevRecord[scoreKey], newRecord[scoreKey]);
                    }
                }
            }
            if (docID === undefined) {
                docID = self.rootRef.doc().id;
            }
            return self.rootRef.doc(docID)
                .set(newRecord);
        });
}

export default Post;