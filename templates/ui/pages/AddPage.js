var AddPage = function (gameObject, key, align, padding, expand) {
    gameObject.setVisible(false); // Default is invisible
    this.add(gameObject, key, align, padding, expand);
    return this;
}
export default AddPage;