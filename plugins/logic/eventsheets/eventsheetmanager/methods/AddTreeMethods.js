export default {
    addEventSheet(data, groupName, config) {
        var eventsheet = this.buildEventSheet(data, groupName, config);
        this.addTree(eventsheet, eventsheet.groupName);
        return this;
    },

    // Override it
    buildEventSheet(data, groupName, config) {
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
