var AddFooter = function (footer, space, align, expand) {
    var currentFooter = this.childrenMap.footer;

    if (currentFooter) {
        this.remove(currentFooter, true);
    }

    var padding;
    if (this.orientation === 1) {
        padding = { top: space };
    } else {
        padding = { left: space };
    }

    if (expand === undefined) {
        expand = true;
    }

    // Insert footer after scrollableSizer
    this.insertAfter(
        this.childrenMap.scrollableSizer,
        footer,
        {
            proportion: 0,
            align: align,
            padding: padding,
            expand: expand
        }
    );

    this.addChildrenMap('footer', footer);
}

export default AddFooter;