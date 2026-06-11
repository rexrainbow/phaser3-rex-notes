export default {
    // Override it
    addEventSheet(data, groupName, config) {
        return this;
    },

    addTree(eventSheet, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        // All event sheets (BT) use the same expressionParser and stringTemplate
        eventSheet
            .setExpressionParser(this.expressionParser)
            .setStringTemplate(this.stringTemplate)

        this.getTreeGroup(groupName).addTree(eventSheet);

        return this;
    },

}
