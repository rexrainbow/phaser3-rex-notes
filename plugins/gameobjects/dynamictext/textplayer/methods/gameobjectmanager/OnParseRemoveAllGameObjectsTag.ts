import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseRemoveAllGameObjectsTag = function(textPlayer?: any, parser?: any, config?: any) {
    var goType = config.name;
    parser
        .on('-', function(tag?: any) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/goType]
            if (tag === goType) {
            } else {
                return;
            }

            AppendCommandBase.call(textPlayer,
                `${goType}.removeall`,   // name
                RemoveAllSprites,        // callback
                goType,                  // params
                textPlayer,              // scope
            );
            parser.skipEvent();
        })
}

var RemoveAllSprites = function(goType?: any) {
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.removeAll();
}

export default OnParseRemoveAllGameObjectsTag;