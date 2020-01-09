import { TimeTagKeys, ScoreKeys, FullTimeName } from './Const.js';

var GetScore = function (userID) {
    if (userID === undefined) {
        userID = this.userID;
    }
    var self = this;
    return this.getMyRecordQuery().find()
        .then(function (results) {
            var myRecord = results[0];
            if (myRecord) {
                myRecord = myRecord.toJSON();
                if (self.timeFilters !== false) {
                    var scores = {};
                    for (var t in self.timeFilters) {
                        scores[FullTimeName[t]] = [item[ScoreKeys[t]], item[TimeTagKeys[t]]];
                        delete item[TimeTagKeys[t]];
                        delete item[ScoreKeys[t]];
                    }
                    myRecord.scores = scores;
                }
            }
            return Promise.resolve(myRecord);
        });
}

export default GetScore;