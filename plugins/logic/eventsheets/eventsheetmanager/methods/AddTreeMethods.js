export default {
    // Override it
    addEventSheet(data, groupName, config) {
        return this;
    },

    addTree(eventSheet, groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName
        }
        this.getTreeGroup(groupName).addTree(eventSheet);

        // All event sheets (BT) use the same expressionParser and stringTemplate
        eventSheet
            .setExpressionParser(this.expressionParser)
            .setStringTemplate(this.stringTemplate)

        return this;
    },

}