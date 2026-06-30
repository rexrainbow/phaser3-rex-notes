// Utils
var GetStartGroupName = function (eventSheetManager, args) {
    switch (args.length) {
        case 0:
            return eventSheetManager.defaultTreeGroupName;

        case 1:
            return eventSheetManager.hasTreeGroup(args[0]) ? args[0] : eventSheetManager.defaultTreeGroupName;

        case 2:
            return (typeof (args[1]) === 'string') ? args[1] : eventSheetManager.defaultTreeGroupName;

        default:
            return args[1];
    }
}

export default GetStartGroupName;
