import GetValue from '../../utils/object/GetValue.js';
import Load from './Load.js';

class PageLoader {
    constructor(config) {
        this.items = [];
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.items.length = 0;
        this.startIndex = 0;
        this.pageIndex = 0;
        this.isLastPage = false;
        this.setLinesCount(GetValue(o, 'lines', 10));
    }

    setLinesCount(linesCnt) {
        this.linesInPage = linesCnt;
        return this;
    }

    loadLines(query, startIndex, linesCnt) {
        if (startIndex === undefined) {
            startIndex = 0;
        }
        if (linesCnt === undefined) {
            linesCnt = Infinity;
        }

        this.items.length = 0;

        var self = this;
        return new Promise(function (resolve, reject) {
            Load(query, startIndex, linesCnt)
                .then(function (items) {
                    self.items = items;
                    self.startIndex = startIndex;
                    self.pageIndex = Math.floor(startIndex / self.linesInPage);
                    if (linesCnt <= 1000) {
                        self.isLastPage = (items.length < linesCnt);
                    } else {
                        self.isLastPage = true;
                    }

                    resolve(items, startIndex);
                })
                .catch(function (error) {
                    self.isLastPage = false;

                    reject(error);
                })
        });
    }

    loadPage(query, pageIndex) {
        var startIndex = pageIndex * this.linesInPage;
        return this.loadLines(query, startIndex, this.linesInPage);
    }

    loadCurrentPage(query) {
        return this.loadLines(query, this.startIndex, this.linesInPage);
    }

    loadNextPage(query) {
        var startIndex = this.startIndex + this.linesInPage;
        return this.loadLines(query, startIndex, this.linesInPage);
    }

    loadPreviousPage(query) {
        var startIndex = this.startIndex - this.linesInPage;
        return this.loadLines(query, startIndex, this.linesInPage);
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