import Load from '../utils/query/Load';

var Methods = {
    loadItems(startIndex?: any, itemCount?: any) {
        if (startIndex === undefined) {
            startIndex = 0;
        }
        if (itemCount === undefined) {
            itemCount = Infinity;
        }

        this.items.length = 0;

        var self = this;
        return Load(this.query, startIndex, itemCount)
            .then(function(items?: any) {
                self.items = items;
                self.startIndex = startIndex;
                self.pageIndex = Math.floor(startIndex / self.itemCount);
                self.isFullPage = (itemCount === Infinity) ? true : (itemCount === items.length);
                return Promise.resolve(items);
            })
            .catch(function(error?: any) {
                self.isFullPage = false;
                return Promise.reject(error);
            })
    },

    loadPage(pageIndex?: any) {
        var startIndex = pageIndex * this.itemCount;
        return this.loadItems(startIndex, this.itemCount);
    },

    loadFirstPage() {
        return this.loadItems(0, this.itemCount);
    },

    loadCurrentPage() {
        return this.loadItems(this.startIndex, this.itemCount);
    },

    loadNextPage() {
        var startIndex = this.startIndex + this.itemCount;
        return this.loadItems(startIndex, this.itemCount);
    },

    loadPreviousPage() {
        var startIndex = this.startIndex - this.itemCount;
        return this.loadItems(startIndex, this.itemCount);
    }
}

export default Methods;