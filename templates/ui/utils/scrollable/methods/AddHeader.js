var AddHeader = function (header, space, align, expand) {
    var currentHeader = this.childrenMap.header;

    if (currentHeader) {
        this.remove(currentHeader, true);
    }

    var padding;
    if (this.orientation === 1) {
        padding = { bottom: space };
    } else {
        padding = { right: space };
    }

    if (expand === undefined) {
        expand = true;
    }

    // Insert header before scrollableSizer
    this.insertBefore(
        this.childrenMap.scrollableSizer,
        header,
        {
            proportion: 0,
            align: align,
            padding: padding,
            expand: expand
        }
    );

    this.addChildrenMap('header', header);
}

export default AddHeader;