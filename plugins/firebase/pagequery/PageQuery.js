import GetValue from '../../utils/object/GetValue.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';
import LoadFirstPage from './LoadFirstPage.js';
import LoadNextPage from './LoadNextPage.js';
import LoadPreviousPage from './LoadPreviousPage.js';
import LoadCurrentPage from './LoadCurrentPage.js';

class PageQuery {
    constructor(config) {
        this.setItemCount(GetValue(config, 'itemCount', 10));
        this.setQuery(GetValue(config, 'query', undefined));
        this.setBaselineDoc(GetValue(config, 'baselineDoc', undefined), GetValue(config, 'baselineMode', 'startAt'));
        this.pageIndex = undefined;
        this.baselineDocRef = undefined;
        this.baselineMode = 'startAt';
        this.startItemIndex = undefined;
        this.endItemIndex = undefined;
        this.currPageStartDocRef = undefined; // For loading previous page
        this.currPageEndDocRef = undefined; // For loading next page
        this.prevPageEndDocRef = undefined; // For loading current page
        this.cacheItems = undefined;
    }

    setItemCount(count) {
        this.itemCount = count;
        return this;
    }

    setQuery(nextQuery, prevQuery) {
        if (IsPlainObject(nextQuery)) {
            var config = nextQuery;
            this.nextQuery = config.next;
            this.prevQuery = config.previous;
        } else {
            this.nextQuery = nextQuery;
            this.prevQuery = prevQuery;
        }

        this.pageIndex = undefined;
        return this;
    }

    setBaselineDoc(doc, mode) {
        if (doc) {
            this.baselineDocRef = doc.ref;
            this.baselineMode = mode;
        } else {
            this.baselineDocRef = undefined;
        }
        return this;
    }
}

var methods = {
    loadFirstPage: LoadFirstPage,
    loadNextPage: LoadNextPage,
    loadPreviousPage: LoadPreviousPage,
    loadCurrentPage: LoadCurrentPage
}

Object.assign(
    PageQuery.prototype,
    methods
);

export default PageQuery;