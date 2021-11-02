var LoadHeader = function (fileID) {
    let header = this.cacheHeaders[fileID];
    if (header) {
        return Promise.resolve(header);
    }

    // Can't find in cache headers, load from store
    var self = this;
    return this.store.getItem(`header-${fileID}`)
        .then(function (value) {
            self.cacheHeaders[fileID] = value; // Cache it
            return Promise.resolve(value);
        });

}

export default LoadHeader;