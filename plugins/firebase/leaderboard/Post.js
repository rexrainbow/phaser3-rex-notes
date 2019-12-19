var Post = function (score, extraData) {
    var newRecord = {
        userID: this.userInfo.userID,
        boardID: this.boardID,
        userName: this.userInfo.userName
    };
    var curTimeData = GetTime();
    for (var t in this.timeFilter) {
        if (!this.timeFilter[t]) {
            continue;
        }

        var T = t.toUpperCase();
        newRecord[`tag${T}`] = curTimeData[t];
        newRecord[`score${T}`] = score;

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
            debugger
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

                    var T = t.toUpperCase();
                    var timeTagKey = `tag${T}`;
                    if (prevRecord[timeTagKey] === newRecord[timeTagKey]) {
                        var scoreKey = `score${T}`;
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
export default Post;