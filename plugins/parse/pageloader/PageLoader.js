import GetValue from '../../utils/object/GetValue.js';
import LoadMethods from './LoadMethods.js';

class PageLoader {
    constructor(config) {
        this.items = [];
        this.startIndex = 0;
        this.pageIndex = 0;
        this.isLastPage = false;
        this.setItemCount(GetValue(config, 'lines', 10));
        this.setQuery(GetValue(config, 'query', undefined));
    }

    setItemCount(itemCount) {
        this.itemCount = itemCount;
        return this;
    }

    setQuery(query) {
        this.query = query;
        this.items.length = 0;
        return this;
    }

    getItem(i) {
        return this.items[i - this.startIndex];
    }

    findFirst(key, value) {
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