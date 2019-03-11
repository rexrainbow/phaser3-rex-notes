var GetPage = function (key) {
    if (key === undefined) {
        return null;
    } else if (!this.sizerChildren.has(key)) {
        return null;
    } else {
        return this.sizerChildren.get(key);
    }
}
export default GetPage;