import Clone from '../../utils/object/Clone.js';

const TIMETYPES = ['d', 'w', 'm', 'y'];
var Post = function (score, extraData) {
    var baseRecord = {
        userID: this.userInfo.userID,
        boardID: this.boardID,
        score: score,
        userName: this.userInfo.userName
    };
    if (this.tag) {
        baseRecord.tag = this.tag;
    }
    if (extraData) {
        Object.assign(baseRecord, extraData);
    }
    var curTimeData = GetTime();
    var self = this;
    return this.getRecordQuery(this.boardID, this.tag, this.userInfo.userID, undefined)
        .get()
        .then(function (querySnapshot) {
            var records = {}
            querySnapshot.forEach(function (doc) {
                let record = doc.data();
                record.docID = doc.id;
                let timeType = record.timeTag.split('-')[0];
                records[timeType] = record;
            });

            var record, timeType, docRef;
            var batch = self.database.batch();
            for (var i = 0, cnt = TIMETYPES.length; i < cnt; i++) {
                timeType = TIMETYPES[i];
                record = UpdateRecord.call(self, records, timeType, baseRecord, curTimeData);
                docRef = self.rootRef.doc(record.docID);
                delete record.docID;
                batch.set(docRef, record);
            }
            return batch.commit();
        });
}

var GetTime = function (timeStamp) {
    var date = (timeStamp) ? (new Date(timeStamp)) : (new Date());
    var Jan1st = new Date(date.getFullYear(), 0, 1);
    var week = Math.ceil((((date - Jan1st) / 86400000) + Jan1st.getDay() + 1) / 7);
    return {
        d: date.getDate(),
        w: week,
        m: (date.getMonth() + 1),
        y: (date.getFullYear())
    };
}

var UpdateRecord = function (records, timeType, baseRecord, curTimeData) {
    var record = records[timeType];
    var curTime = curTimeData[timeType];
    var curTimeTag = `${timeType}-${curTime}`;
    if (record) {
        var previousTime = parseInt(record.timeTag.split('-')[1]);
        var previousDocID = record.docID;
        if (curTime === previousTime) { // During time -> Set max score
            var previousScore = record.score;
            record = Clone(baseRecord);
            record.score = Math.max(previousScore, record.score);
        } else { // Expired record -> Overwrite it
            record = Clone(baseRecord);
        }
        record.docID = previousDocID;
    } else { // No previous record -> Add a new one
        record = Clone(baseRecord);
        record.docID = this.getNewRecordID();
    }
    record.timeTag = curTimeTag;
    records[timeType] = record;
    return record;
}

export default Post;