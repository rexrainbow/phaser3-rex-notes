import GetValue from '../../../utils/object/GetValue';
import IsPlainObject from '../../../utils/object/IsPlainObject';
import LoadFirstPage from './LoadFirstPage';
import LoadNextPage from './LoadNextPage';
import LoadPreviousPage from './LoadPreviousPage';
import LoadCurrentPage from './LoadCurrentPage';
import LoadInRange from './LoadInRange';

class PageLoader {
    baselineDocRef: any;
    baselineMode: any;
    cacheItems: any;
    dataMode: any;
    endItemIndex: any;
    isFullPage: any;
    itemCount: any;
    nextQuery: any;
    pageIndex: any;
    prevQuery: any;
    startItemIndex: any;

    constructor(config?: any) {
        this.setItemCount(GetValue(config, 'itemCount', 100));
        this.setQuery(GetValue(config, 'query', undefined));
        this.setDataMode(GetValue(config, 'dataMode', 0));
        this.setBaselineDoc(GetValue(config, 'baselineDoc', undefined), GetValue(config, 'baselineMode', undefined));
        this.pageIndex = undefined;
        this.baselineDocRef = undefined;
        this.baselineMode = 'startAt';
        this.startItemIndex = undefined;
        this.endItemIndex = undefined;
        this.cacheItems = undefined;
        this.isFullPage = undefined;
    }

    setItemCount(count?: any) {
        this.itemCount = count;
        return this;
    }

    setQuery(nextQuery?: any, prevQuery?: any) {
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

    setDataMode(mode?: any) {
        if (typeof (mode) === 'string') {
            mode = DATAMODE[mode];
        }
        this.dataMode = mode;
        return this;
    }

    setBaselineDoc(doc?: any, mode?: any) {
        if (doc?: any) {
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
    loadCurrentPage: LoadCurrentPage,
    load: LoadInRange
}

Object.assign(
    PageLoader.prototype,
    methods
);

const DATAMODE = {
    static: 0,
    dynamic: 1
}

export default PageLoader;