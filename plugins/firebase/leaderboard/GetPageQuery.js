import { TimeTagKeys, ScoreKeys } from './Const.js';
import GetTime from './GetTime.js';

var GetPageQuery = function () {
    var timeTagKey, scoreKey;
    if (this.timeFilters !== false) {
        var t = this.timeFilterType[0];
        timeTagKey = [TimeTagKeys[t], GetTime()[t]];
        scoreKey = ScoreKeys[t];
    } else { // No time filters
        timeTagKey = undefined;
        scoreKey = 'score';
    }

    var baseQuery = this.getRecordQuery(this.boardID, this.tag, undefined, timeTagKey);
    var nextPageQuery = baseQuery.orderBy(scoreKey, 'desc');
    var prevPageQuery = baseQuery.orderBy(scoreKey);
    return {
        next: nextPageQuery,
        previous: prevPageQuery
    }
}

export default GetPageQuery;