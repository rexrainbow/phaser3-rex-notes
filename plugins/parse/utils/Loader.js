import EE from '../../utils/eventemitter/EventEmitter.js';
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

        var eventEmitter = GetValue(o, 'eventEmitter', undefined);
        if (eventEmitter === undefined) {
            eventEmitter = new EE();
        }
        this.eventEmitter = eventEmitter;
        this.setLinesCount(GetValue(o, 'lines', 10));        
    }

    setLinesCount(linesCnt) {
        this.linesInPage = linesCnt;
        return this;
    }

    request(query, startIndex, linesCnt) {
        if (startIndex === undefined) {
            startIndex = 0;
        }
        if (linesCnt === undefined) {
            linesCnt = Infinity;
        }

        this.items.length = 0;

        var self = this;
        var onSuccess = function (items) {
            self.items = items;
            self.startIndex = startIndex;
            self.pageIndex = Math.floor(startIndex / self.linesInPage);

            if (linesCnt <= 1000) {
                self.isLastPage = (items.length < linesCnt);
            } else {
                self.isLastPage = true;
            }

            self.emit('load', items);
        };
        var onError = function (error) {
            self.isLastPage = false;

            self.emit('loadfail', error);
        };
        Query(query, onSuccess, onError, startIndex, linesCnt);
    }

    requestInRange(query, startIndex, linesCnt) {
        this.request(query, startIndex, linesCnt);
    }

    requestTurnToPage(query, pageIndex) {
        var startIndex = pageIndex * this.linesInPage;
        this.request(query, startIndex, this.linesInPage);
    }

    requestUpdateCurrentPage(query) {
        this.request(query, this.startIndex, this.linesInPage);
    }

    requestTurnToNextPage(query) {
        var startIndex = this.startIndex + this.linesInPage;
        this.request(query, startIndex, this.linesInPage);
    }

    requestTurnToPreviousPage(query) {
        var startIndex = this.startIndex - this.linesInPage;
        this.request(query, startIndex, this.linesInPage);
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