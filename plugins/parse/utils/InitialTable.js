var InitialTable = function (item) {
    return new Promise(function (resolve, reject) {
        item
            .save()
            .then(function (result) {
                return result.destroy();
            })
            .then(resolve)
            .catch(reject);
    });
}

export default InitialTable;