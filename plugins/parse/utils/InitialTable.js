var InitialTable = function (item) {
    item
        .save()
        .then(function (result) {
            result.destroy();
        });
}

export default InitialTable;