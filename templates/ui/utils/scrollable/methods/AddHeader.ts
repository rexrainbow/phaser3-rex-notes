var AddHeader = function(header?: any, space?: any, align?: any, expand?: any) {
    var currentHeader = this.childrenMap.header;

    if (currentHeader?: any) {
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