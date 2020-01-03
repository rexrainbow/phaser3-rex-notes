import { TimeTagKeys, ScoreKeys, FullTimeName } from './Const.js';

var GetScore = function (userID) {
    if (userID === undefined) {
        userID = this.userID;
    }
    var self = this;
    return this.getRecordQuery(this.boardID, this.tag, userID, undefined).limit(1).get()
        .then(function (querySnapshot) {
            var item;
            if (querySnapshot.size > 0) {
                var doc = querySnapshot.docs[0];
                item = doc.data();

                if (self.timeFilters !== false) {
                    var scores = {};
                    for (var t in self.timeFilters) {
                        scores[FullTimeName[t]] = [item[ScoreKeys[t]], item[TimeTagKeys[t]]];
                        delete item[TimeTagKeys[t]];
                        delete item[ScoreKeys[t]];
                    }
                    item.scores = scores;
                }
            }
            return Promise.resolve(item);
        });
}

export default GetScore;