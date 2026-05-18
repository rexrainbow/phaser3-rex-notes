import { TimeTagKeys, ScoreKeys } from './Const';
import GetTime from './GetTime';

var Methods = {
    getRecordQuery(boardID?: any, customTag?: any, userID?: any, timeTagKey?: any) {
        var query = this.baseQuery;
        query = (boardID !== undefined) ? query.equalTo('boardID', boardID) : query;
        query = (customTag !== undefined) ? query.equalTo('tag', customTag) : query;
        query = (userID !== undefined) ? query.equalTo('userID', userID) : query;

        if (timeTagKey !== undefined) {
            query = query.equalTo(timeTagKey[0], timeTagKey[1]);
        }
        return query;
    },

    getMyRecordQuery(userID?: any) {        
        if (userID === undefined) {
            userID = this.userID;
        }
        return this.getRecordQuery(this.boardID, this.tag, userID, undefined).limit(1);
    },

    getPageQuery() {
        var timeTagKey, scoreKey;
        if (this.timeFilters !== false) {
            var t = this.timeFilterType[0];
            timeTagKey = [TimeTagKeys[t], GetTime()[t]];
            scoreKey = ScoreKeys[t];
        } else { // No time filters
            timeTagKey = undefined;
            scoreKey = 'score';
        }

        var query = this.getRecordQuery(this.boardID, this.tag, undefined, timeTagKey);
        query = query.descending(scoreKey);
        return query;
    }
}

export default Methods;