import { TimeTagKeys, ScoreKeys, FullTimeName } from './Const.js';

var GetScore = function (userID) {
    var self = this;
    return this.getMyRecordQuery(userID).find()
        .then(function (results) {
            var myRecord = results[0];
            if (myRecord) {
                myRecord = myRecord.toJSON();
                if (self.timeFilters !== false) {
                    var scores = {};
                    for (var t in self.timeFilters) {
                        scores[FullTimeName[t]] = [myRecord[ScoreKeys[t]], myRecord[TimeTagKeys[t]]];
                        delete myRecord[TimeTagKeys[t]];
                        delete myRecord[ScoreKeys[t]];
                    }
                    myRecord.scores = scores;
                }
            }
            return Promise.resolve(myRecord);
        });
}

export default GetScore;