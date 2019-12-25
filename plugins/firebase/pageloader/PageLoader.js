import GetValue from '../../utils/object/GetValue.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';
import LoadFirstPage from './LoadFirstPage.js.js';
import LoadNextPage from './LoadNextPage.js.js';
import LoadPreviousPage from './LoadPreviousPage.js.js';
import LoadCurrentPage from './LoadCurrentPage.js.js';

class PageLoader {
    constructor(config) {
        this.setItemCount(GetValue(config, 'itemCount', 100));
        this.setQuery(GetValue(config, 'query', undefined));
        this.setBaselineDoc(GetValue(config, 'baselineDoc', undefined), GetValue(config, 'baselineMode', undefined));
        this.pageIndex = undefined;
        this.baselineDocRef = undefined;
        this.baselineMode = 'startAt';
        this.startItemIndex = undefined;
        this.endItemIndex = undefined;
        this.currPageStartDocRef = undefined; // For loading previous page
        this.currPageEndDocRef = undefined; // For loading next page
        this.prevPageEndDocRef = undefined; // For loading current page
        this.cacheItems = undefined;
        this.isFullPage = undefined;
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
        this.isFullPage = undefined;
        return this;
    }

    setBaselineDoc(doc, mode) {
        if (doc) {
            this.baselineDocRef = doc.ref;
            this.baselineMode = mode; // 'startAt' or 'startAfter'
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
    PageLoader.prototype,
    methods
);

export default PageLoader;