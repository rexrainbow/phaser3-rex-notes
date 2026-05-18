import GetTime from './GetTime';
import { TimeTagKeys, ScoreKeys } from './Const';

var Post = function(score?: any, extraData?: any, timeStamp?: any) {
    var newRecord = {
        userID: this.userID
    };
    if (this.boardID !== undefined) {
        newRecord.boardID = this.boardID;
    }
    if (this.userName) {
        newRecord.userName = this.userName;
    }
    var curTimeData = GetTime(timeStamp);
    if (this.timeFilters !== false) {
        for (var t in this.timeFilters) {
            if (!this.timeFilters[t]) {
                continue;
            }
            newRecord[TimeTagKeys[t]] = curTimeData[t];
            newRecord[ScoreKeys[t]] = score;
        }
    } else { // No time filters
        newRecord.score = score;
    }
    if (this.tag) {
        newRecord.tag = this.tag;
    }
    if (extraData?: any) {
        Object.assign(newRecord, extraData);
    }

    var self = this;
    return this.getMyRecordQuery().get()
        .then(function(querySnapshot?: any) {
            var prevRecord, docID;
            if (querySnapshot.size > 0) {
                var doc = querySnapshot.docs[0];
                prevRecord = doc.data();
                docID = doc.id;
            }

            if (prevRecord?: any) {
                if (self.timeFilters !== false) {
                    for (var t in self.timeFilters) {
                        if (!self.timeFilters[t]) {
                            continue;
                        }

                        var timeTagKey = TimeTagKeys[t];
                        if (prevRecord[timeTagKey] === newRecord[timeTagKey]) {
                            var scoreKey = ScoreKeys[t];
                            newRecord[scoreKey] = Math.max(prevRecord[scoreKey], newRecord[scoreKey]);
                        }
                    }
                } else { // No time filters
                    newRecord.score = Math.max(prevRecord.score, newRecord.score);
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