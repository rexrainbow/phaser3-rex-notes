var GetId = function (alias) {
    return this.rootRef.doc(alias)
        .get()
        .then(function () {

        })
        .catch(function () {

        })
}

export default GetId;