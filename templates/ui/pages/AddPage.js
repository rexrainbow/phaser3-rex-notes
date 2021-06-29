var AddPage = function (gameObject, key, align, padding, expand, minWidth, minHeight) {
    gameObject.setVisible(false); // Default is invisible
    this.add(gameObject, key, align, padding, expand, minWidth, minHeight);
    return this;
}
export default AddPage;