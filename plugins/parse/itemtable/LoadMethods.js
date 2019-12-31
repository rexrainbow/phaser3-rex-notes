var Methods = {
    loadItem(itemId) {
        return this.createQuery().get(itemId);
    },

    loadPage(query, pageIndex) {
        return this.pageLoader.loadPage(query, pageIndex);
    },

    loadCurrentPage(query) {
        return this.pageLoader.loadCurrentPage(query);
    },

    loadNextPage(query) {
        return this.pageLoader.loadNextPage(query);
    },

    loadPreviousPage(query) {
        return this.pageLoader.loadPreviousPage(query);
    },

    loadItems(query, startIndex, linesCnt) {
        return this.pageLoader.loadItems(query, startIndex, linesCnt);
    },

    loadAll(query) {
        if (query === undefined) {
            query = this.createQuery();
        }
        return this.pageLoader.loadItems(query);
    }
}

export default Methods;