import { TimeTagKeys, ScoreKeys } from './Const';

var Methods = {
    loadFirstPage() {
        this.resetPageQuery();

        var self = this;
        return this.page.loadFirstPage()
            .then(function(items?: any) {
                return Promise.resolve(ItemsToDataArray.call(self, items));
            })
    },

    loadNextPage() {
        this.resetPageQuery();

        var self = this;
        return this.page.loadNextPage()
            .then(function(items?: any) {
                return Promise.resolve(ItemsToDataArray.call(self, items));
            })
    },

    loadPreviousPage() {
        this.resetPageQuery();

        var self = this;
        return this.page.loadPreviousPage()
            .then(function(items?: any) {
                return Promise.resolve(ItemsToDataArray.call(self, items));
            })
    },

    loadCurrentPage() {
        this.resetPageQuery();

        var self = this;
        return this.page.loadCurrentPage()
            .then(function(items?: any) {
                return Promise.resolve(ItemsToDataArray.call(self, items));
            })
    },

    load(count?: any, skip?: any) {
        this.resetPageQuery();

        var self = this;
        return this.page.load(count, skip)
            .then(function(items?: any) {
                return Promise.resolve(ItemsToDataArray.call(self, items));
            })
    },

    resetPageQuery() {
        if (!this.resetQueryFlag) {
            return this;
        }

        this.resetQueryFlag = false;
        this.page.setQuery(this.getPageQuery());
        return this;
    }
}

var ItemsToDataArray = function(items?: any) {
    var dataArray = [],
        data;

    var scoreKey = ScoreKeys[this.timeFilterType[0]];
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        data = items[i].toJSON();

        if (this.timeFilters !== false) {
            data.score = data[scoreKey];
            // Remove timeFilterKeys, and scoreKeys
            for (var t in this.timeFilters) {
                delete data[TimeTagKeys[t]];
                delete data[ScoreKeys[t]];
            }
        }
        dataArray.push(data);
    }
    return dataArray;
}

export default Methods;