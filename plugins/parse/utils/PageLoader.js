import GetValue from '../../utils/object/GetValue.js';
import Load from './Load.js';

class PageLoader {
    constructor(config) {
        this.items = [];
        this.startIndex = 0;
        this.pageIndex = 0;
        this.isLastPage = false;
        this.setItemCount(GetValue(config, 'lines', 10));
    }

    setItemCount(itemCount) {
        this.itemCount = itemCount;
        return this;
    }

    loadLines(query, startIndex, itemCount) {
        if (startIndex === undefined) {
            startIndex = 0;
        }
        if (itemCount === undefined) {
            itemCount = Infinity;
        }

        this.items.length = 0;

        var self = this;
        return Load(query, startIndex, itemCount)
            .then(function (items) {
                self.items = items;
                self.startIndex = startIndex;
                self.pageIndex = Math.floor(startIndex / self.itemCount);
                self.isLastPage = (itemCount === Infinity) ? true : (itemCount > items.length);
                return Promise.resolve(items);
            })
            .catch(function (error) {
                self.isLastPage = false;
                return Promise.reject(error);
            })
    }

    loadPage(query, pageIndex) {
        var startIndex = pageIndex * this.itemCount;
        return this.loadLines(query, startIndex, this.itemCount);
    }

    loadCurrentPage(query) {
        return this.loadLines(query, this.startIndex, this.itemCount);
    }

    loadNextPage(query) {
        var startIndex = this.startIndex + this.itemCount;
        return this.loadLines(query, startIndex, this.itemCount);
    }

    loadPreviousPage(query) {
        var startIndex = this.startIndex - this.itemCount;
        return this.loadLines(query, startIndex, this.itemCount);
    }

    getItem(i) {
        return this.items[i - this.startIndex];
    }

    findFirst(key, value, startIndex) {
        if (startIndex === undefined) {
            startIndex = 0;
        }
        for (var i, cnt = this.items.length; i < cnt; i++) {
            if (this.items[i].get(key) === value) {
                return i + this.startIndex;
            }
        }
        return -1;
    }

}

export default PageLoader;