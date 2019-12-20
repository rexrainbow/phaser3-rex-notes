import GetValue from '../../utils/object/GetValue.js';
import Post from './Post.js';
import LoadFirstPage from './LoadFirstPage.js';
import LoadNextPage from './LoadNextPage.js';
import LoadPreviousPage from './LoadPreviousPage.js';
import GetTime from './GetTime.js';

class LeaderBoard {
    constructor(config) {
        this.database = firebase.firestore();
        this.setRootPath(GetValue(config, 'root', ''));

        this.userInfo = { userID: '', userName: '' };
        this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', ''));
        this.setBoardID(GetValue(config, 'boardID', ''));
        this.setTag(GetValue(config, 'tag', undefined));
        this.timeFilter = {
            d: GetValue(config, 'timeFilter.day', true),
            w: GetValue(config, 'timeFilter.week', true),
            m: GetValue(config, 'timeFilter.month', true),
            y: GetValue(config, 'timeFilter.year', true)
        }
        this.setTimeFilterType(GetValue(config, 'timeFilterType', 'year'));

        this.page = new PageQuery();
        this.setPageItemCount(GetValue(config, 'pageItemCount', 10));
        this.resetQueryFlag = true;
    }

    shutdown() {
    }

    destroy() {
        this.shutdown();
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        this.resetQueryFlag = true;
        return this;
    }

    setUser(userID, userName) {
        if (typeof (userID) === 'string') {
            this.userInfo.userID = userID;
            this.userInfo.userName = userName;
        } else {
            this.userInfo = userID;
        }
        return this;
    }

    setBoardID(boardID) {
        this.boardID = boardID;
        this.resetQueryFlag = true;
        return this;
    }

    setTag(tag) {
        this.tag = tag;
        this.resetQueryFlag = true;
        return this;
    }

    setTimeFilterType(type) {
        this.timeFilterType = type;
        this.resetQueryFlag = true;
        return this;
    }

    setPageItemCount(count) {
        this.page.setItemCount(count);
        return this;
    }

    getRecordQuery(boardID, customTag, userID, timeTag) {
        var query = this.rootRef;
        query = (boardID) ? query.where('boardID', '==', boardID) : query;
        query = (customTag) ? query.where('tag', '==', customTag) : query;
        query = (userID) ? query.where('userID', '==', userID) : query;

        if (timeTag !== undefined) {
            timeTag = timeTag.split(':'); // 'tagD:10', 'tagW:10', 'tagM:10', 'tagY:2020'
            query = query.where(timeTag[0], '==', timeTag[1]);
        }
        return query;
    }

    resetPageQuery() {
        if (!this.resetQueryFlag) {
            return this;
        }

        var t = this.timeFilterType[0];
        var T = t.toUpperCase();
        var curTimeData = GetTime()[t];
        var timeTag = `tag${T}:${curTimeData}`;
        var scoreTag = `score${T}`;

        var baseQuery = this.getRecordQuery(this.boardID, this.tag, undefined, timeTag);
        var nextPageQuery = baseQuery.orderBy(scoreTag, 'desc');
        var prevPageQuery = baseQuery.orderBy(scoreTag);

        this.page.setQuery(nextPageQuery, prevPageQuery);
        this.resetQueryFlag = false;
        return this;
    }
}

var methods = {
    post: Post,
    loadFirstPage: LoadFirstPage,
    loadNextPage: LoadNextPage,
    loadPreviousPage: LoadPreviousPage,
}

Object.assign(
    LeaderBoard.prototype,
    methods
);

export default LeaderBoard;