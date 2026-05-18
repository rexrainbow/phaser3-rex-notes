var InitialTable = function(item?: any) {
    return item.save()
        .then(function(result?: any) {
            return result.destroy();
        })
}

export default InitialTable;