import { TimeTagKeys, ScoreKeys, FullTimeName } from './Const';

var GetScore = function(userID?: any) {
    var self = this;
    return this.getMyRecordQuery(userID).find()
        .then(function(results?: any) {
            var myRecord = results[0];
            if (myRecord?: any) {
                myRecord = myRecord.toJSON();
            }
            return Promise.resolve(myRecord);
        });
}

export default GetScore;