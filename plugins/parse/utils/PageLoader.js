import GetValue from '../../utils/object/GetValue.js';
import Load from './Load.js';

class PageLoader {
    constructor(config) {
        this.items = [];
        this.startIndex = 0;
        this.pageIndex = 0;
        this.isLastPage = false;
        this.setLinesCount(GetValue(config, 'lines', 10));
    }

    setLinesCount(lineCount) {
        this.lineCount = lineCount;
        return this;
    }

    loadLines(query, startIndex, lineCount) {
        if (startIndex === undefined) {
            startIndex = 0;
        }
        if (lineCount === undefined) {
            lineCount = Infinity;
        }

        this.items.length = 0;

        var self = this;
        return Load(query, startIndex, lineCount)
            .then(function (items) {
                self.items = items;
                self.startIndex = startIndex;
                self.pageIndex = Math.floor(startIndex / self.lineCount);
                self.isLastPage = (lineCount === Infinity) ? true : (lineCount > items.length);
                return Promise.resolve(items);
            })
            .catch(function (error) {
                self.isLastPage = false;
                return Promise.reject(error);
            })
    }

    loadPage(query, pageIndex) {
        var startIndex = pageIndex * this.lineCount;
        return this.loadLines(query, startIndex, this.lineCount);
    }

    loadCurrentPage(query) {
        return this.loadLines(query, this.startIndex, this.lineCount);
    }

    loadNextPage(query) {
        var startIndex = this.startIndex + this.lineCount;
        return this.loadLines(query, startIndex, this.lineCount);
    }

    loadPreviousPage(query) {
        var startIndex = this.startIndex - this.lineCount;
        return this.loadLines(query, startIndex, this.lineCount);
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