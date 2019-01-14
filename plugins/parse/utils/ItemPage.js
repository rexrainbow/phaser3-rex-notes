import Query from './Query.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ItemPage {
    constructor(config) {
        // export
        this.onReceived = null;
        this.onReceivedError = null;
        this.onGetIterItem = null; // used in ForEachItem
        // export
        this.items = [];
        this.startIndex = 0;
        this.linesInPage = GetValue(config, 'linesCnt', 10);
        this.pageIndex = 0;
        this.isLastPage = false;
    }

    reset() {
        this.items.length = 0;
        this.startIndex = 0;
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

            if (self.onReceived) {
                self.onReceived();
            }
        };
        var onError = function (error) {
            self.isLastPage = false;

            if (self.onReceivedError) {
                self.onReceivedError(error);
            }
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

    loadAllItems(query) {
        this.request(query);
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

export default ItemPage;