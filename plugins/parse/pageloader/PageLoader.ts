import GetValue from '../../utils/object/GetValue';
import LoadMethods from './LoadMethods';

class PageLoader {
    isFullPage: any;
    itemCount: any;
    items: any;
    pageIndex: any;
    query: any;
    startIndex: any;

    constructor(config?: any) {
        this.items = [];
        this.startIndex = 0;
        this.pageIndex = 0;
        this.isFullPage = false;
        this.setItemCount(GetValue(config, 'itemCount', 100));
        this.setQuery(GetValue(config, 'query', undefined));
    }

    setItemCount(itemCount?: any) {
        this.itemCount = itemCount;
        this.pageIndex = Math.floor(this.startIndex / itemCount);
        return this;
    }

    setQuery(query?: any) {
        this.query = query;
        return this;
    }

    getItem(i?: any) {
        return this.items[i - this.startIndex];
    }

    findFirst(key?: any, value?: any) {
        for (var i, cnt = this.items.length; i < cnt; i++) {
            if (this.items[i].get(key) === value) {
                return i + this.startIndex;
            }
        }
        return -1;
    }

}

Object.assign(
    PageLoader.prototype,
    LoadMethods
);

export default PageLoader;