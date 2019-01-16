import GetValue from '../../utils/object/GetValue.js';
import Query from './Query.js';

class Loader {
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

    load(query, startIndex, linesCnt) {
        if (startIndex === undefined) {
            startIndex = 0;
        }
        if (linesCnt === undefined) {
            linesCnt = Infinity;
        }

        this.items.length = 0;

        var self = this;
        return new Promise(function (resolve, reject) {
            Query(query, startIndex, linesCnt)
                .then(function (items) {
                    self.items = items;
                    self.startIndex = startIndex;
                    self.pageIndex = Math.floor(startIndex / self.linesInPage);
                    if (linesCnt <= 1000) {
                        self.isLastPage = (items.length < linesCnt);
                    } else {
                        self.isLastPage = true;
                    }

                    resolve(item);
                })
                .catch(function (error) {
                    self.isLastPage = false;

                    reject(error);
                })
        });
    }

    requestInRange(query, startIndex, linesCnt) {
        this.load(query, startIndex, linesCnt);
    }

    requestTurnToPage(query, pageIndex) {
        var startIndex = pageIndex * this.linesInPage;
        this.load(query, startIndex, this.linesInPage);
    }

    requestUpdateCurrentPage(query) {
        this.load(query, this.startIndex, this.linesInPage);
    }

    requestTurnToNextPage(query) {
        var startIndex = this.startIndex + this.linesInPage;
        this.load(query, startIndex, this.linesInPage);
    }

    requestTurnToPreviousPage(query) {
        var startIndex = this.startIndex - this.linesInPage;
        this.load(query, startIndex, this.linesInPage);
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

export default Loader;