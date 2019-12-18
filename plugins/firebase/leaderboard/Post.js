import { GetTime } from './GetTime.js';

const TIMETYPES = ['D', 'W', 'M', 'Y'];
var Post = function (score, extraData) {
    var curTimeData = GetTime();
    var newRecord = {
        userID: this.userInfo.userID,
        boardID: this.boardID,
        userName: this.userInfo.userName,
        tagD: curTimeData.d,
        tagW: curTimeData.w,
        tagM: curTimeData.m,
        tagY: curTimeData.y,
        scoreD: score,
        scoreW: score,
        scoreM: score,
        scoreY: score,
    };
    if (this.tag) {
        newRecord.tag = this.tag;
    }
    if (extraData) {
        Object.assign(newRecord, extraData);
    }
    var curTimeData = GetTime();
    var self = this;
    return this.getRecordQuery(this.boardID, this.tag, this.userInfo.userID, undefined).limit(1)
        .get()
        .then(function (querySnapshot) {
            debugger
            var prevRecord, docID;
            querySnapshot.forEach(function (doc) {
                prevRecord = doc.data();
                docID = doc.id;
            });

            if (prevRecord) {
                var timeType, timeTagKey, scoreKey;
                for (var i = 0, cnt = TIMETYPES.length; i < cnt; i++) {
                    timeType = TIMETYPES[i];
                    timeTagKey = `tag${timeType}`;
                    if (prevRecord[timeTagKey] === newRecord[timeTagKey]) {
                        scoreKey = `score${timeType}`;
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