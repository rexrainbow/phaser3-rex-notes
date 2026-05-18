import GetValue from '../../utils/object/GetValue';
import IsPlainObject from '../../utils/object/IsPlainObject';
import Post from './Post';;
import LoadMethods from './LoadMethods';
import GetScore from './GetScore';
import GetRank from './GetRank';
import DeleteMethods from './DeleteMethods';
import GetQueryMethods from './GetQueryMethods';
import PageLoader from '../pageloader/PageLoader';

class LeaderBoard {
    boardID: any;
    customClass: any;
    page: any;
    resetQueryFlag: any;
    tag: any;
    timeFilters: any;
    timeFilterType: any;
    userInfo: any;

    constructor(config?: any) {
        this.setClassName(GetValue(config, 'className', 'Item'));

        this.userInfo = { userID: undefined, userName: undefined };
        this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', undefined));
        this.setBoardID(GetValue(config, 'boardID', undefined));
        this.setTag(GetValue(config, 'tag', undefined));
        this.setTimeFilters(GetValue(config, 'timeFilters', false));
        this.setTimeFilterType(GetValue(config, 'timeFilterType', 'year'));

        this.page = new PageLoader({
            itemCount: GetValue(config, 'pageItemCount', 100)
        });
        this.resetQueryFlag = true;
    }

    shutdown() {
    }

    destroy() {
        this.shutdown();
    }

    get userID() {
        return this.userInfo.userID;
    }

    set userID(value) {
        this.userInfo.userID = value;
    }

    get userName() {
        return this.userInfo.userName;
    }

    set userName(value) {
        this.userInfo.userName = value;
    }

    setClassName(className?: any) {
        this.resetQueryFlag = true;
        this.customClass = Parse.Object.extend(className);
        return this;
    }

    setUser(userID?: any, userName?: any) {
        if (IsPlainObject(userID)) {
            this.userInfo = userID;
        } else {
            this.userID = userID;
            this.userName = userName;
        }
        return this;
    }

    setBoardID(boardID?: any) {
        this.resetQueryFlag |= (this.boardID !== boardID);
        this.boardID = boardID;
        return this;
    }

    setTag(tag?: any) {
        this.resetQueryFlag |= (this.tag !== tag);
        this.tag = tag;
        return this;
    }

    setTimeFilters(filters?: any) {
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

    setTimeFilterType(type?: any) {
        this.resetQueryFlag |= (this.timeFilterType !== type);
        this.timeFilterType = type;
        return this;
    }

    setPageItemCount(count?: any) {
        this.page.setItemCount(count);
        return this;
    }

    get baseQuery() {
        return new Parse.Query(this.customClass);
    }

    get pageIndex() {
        return this.page.pageIndex;
    }

    get isFirstPage() {
        return (this.page.pageIndex === 0);
    }

    get isLastPage() {
        return (this.page.isFullPage === false);
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
    LoadMethods,
    DeleteMethods
);

export default LeaderBoard;