var SaveItems = function (dataArray) {
    if (this.primaryKeys.length === 0) {
        // TODO
    } else {
        var promises = [];
        for (var i = 0; i < 5; i++) {
            promises.push(
                this.save(dataArray[i])
            )
        }
        return Promise.all(promises);
    }
}
export default SaveItems;