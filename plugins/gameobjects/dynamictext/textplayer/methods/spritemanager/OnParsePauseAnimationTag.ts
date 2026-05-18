import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var IsPauseAnimationTag = function(tags?: any, goType?: any) {
    // goType.name.pause 
    return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'pause');
}

var OnParsePauseAnimationTag = function(textPlayer?: any, parser?: any, config?: any) {
    var goType = config.name;
    parser
        .on('+', function(tag?: any) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name.pause=key]
            var tags = tag.split('.');
            var name;
            if (IsPauseAnimationTag(tags, goType)) {
                name = tags[1];
            } else {
                return;
            }

            AppendCommandBase.call(textPlayer,
                `${goType}.pause`,  // name
                PauseAnimation,     // callback
                [goType, name],     // params
                textPlayer,         // scope
            );

            parser.skipEvent();
        })
}

var PauseAnimation = function(params?: any) {
    var goType, args;
    [goType, ...args] = params;
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.pauseAnimation(...args);
}

export default OnParsePauseAnimationTag;