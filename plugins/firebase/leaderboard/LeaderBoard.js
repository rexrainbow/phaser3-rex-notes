import GetValue from '../../utils/object/GetValue.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';
import Post from './Post.js';;
import LoadPageMethods from './LoadPageMethods.js';
import GetScore from './GetScore.js';
import GetRank from './GetRank.js';
import DeleteMethods from './DeleteMethods.js';
import GetQueryMethods from './GetQueryMethods.js';
import PageQuery from '../pagequery/PageQuery.js';

class LeaderBoard {
    constructor(config) {
        this.database = firebase.firestore();
        this.setRootPath(GetValue(config, 'root', ''));

        this.userInfo = { userID: undefined, userName: undefined };
        this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', undefined));
        this.setBoardID(GetValue(config, 'boardID', undefined));
        this.setTag(GetValue(config, 'tag', undefined));
        this.setTimeFilters(GetValue(config, 'timeFilters', false));
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
        this.resetQueryFlag |= (this.rootPath !== rootPath);
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
    }

    setUser(userID, userName) {
        if (IsPlainObject(userID)) {
            this.userInfo = userID;
        } else {
            this.userInfo.userID = userID;
            this.userInfo.userName = userName;
        }
        return this;
    }

    setBoardID(boardID) {
        this.resetQueryFlag |= (this.boardID !== boardID);
        this.boardID = boardID;
        return this;
    }

    setTag(tag) {
        this.resetQueryFlag |= (this.tag !== tag);
        this.tag = tag;
        return this;
    }

    setTimeFilters(filters) {
        if (filters === false) {
            this.timeFilters = false;
        } else { // filters is true, or a plain object
            this.timeFilters = {
                d: GetValue(filters, 'day', true),
                w: GetValue(filters, 'week', true),
                m: GetValue(filters, 'month', true),
                y: GetValue(filters, 'year', true)
            }
        }
        return this;
    }

    setTimeFilterType(type) {
        this.resetQueryFlag |= (this.timeFilterType !== type);
        this.timeFilterType = type;
        return this;
    }

    setPageItemCount(count) {
        this.page.setItemCount(count);
        return this;
    }

    isFirstPage() {
        return (this.page.pageIndex === 0);
    }

    isLastPage() {
        return this.page.cacheItems &&
            (this.page.cacheItems.length < this.page.itemCount);
    }
}

var methods = {
    post: Post,
    getScore: GetScore,
    getRank: GetRank
}

Object.assign(
    LeaderBoard.prototype,
    methods,
    GetQueryMethods,
    LoadPageMethods,
    DeleteMethods
);

export default LeaderBoard;