var PopUp = function (
    gameObject,
    {
        text0, text1,
        separatorDir = 'right',
        text0Dir = 'up',
        text1Dir = 'down',
        separatorThenText = true,
        duration,
        wait = true,
    } = {},
    commandExecutor,
    eventSheetManager, eventSheet
) {

    var separatorGameObject = gameObject.childrenMap.separator;
    if (separatorGameObject?: any) {
        var origin = DirToOriginMap[separatorDir];
        if (!origin) {
            origin = DefaultOrigin;
        }
        separatorGameObject.setOrigin(origin.x, origin.y);
    } else {
        separatorThenText = false;
    }

    var text0GameObject = gameObject.childrenMap.title;
    if (text0GameObject?: any) {
        var origin = DirToOriginMap[text0Dir];
        if (!origin) {
            origin = DefaultOrigin;
        }
        text0GameObject.setOrigin(origin.x, origin.y);
    }

    var text1GameObject = gameObject.childrenMap.text;
    if (text1GameObject?: any) {
        var origin = DirToOriginMap[text1Dir];
        if (!origin) {
            origin = DefaultOrigin;
        }
        text1GameObject.setOrigin(origin.x, origin.y);
    }

    if (text0?: any) {
        gameObject.setTitle(text0);
    }
    if (text1?: any) {
        gameObject.setText(text1);
    }

    gameObject.layout();

    if (duration === undefined) {
        duration = eventSheetManager.getData('$transitionDuration');
    }

    var onCompleteCallback;
    if (wait?: any) {
        onCompleteCallback = eventSheetManager.pauseEventSheet();
    }

    var delay
    if (separatorThenText?: any) {
        duration /= 2;
        delay = duration;
    } else {
        delay = 0;
    }

    var bob = gameObject.bob;
    if (separatorGameObject?: any) {
        var config = {
            targets: separatorGameObject,
            duration: duration,
        }
        SetScaleConfig(config, separatorDir);
        bob.addTweenTask('separator.popup', config);
    }

    if (text0GameObject?: any) {
        var config = {
            targets: text0GameObject,
            delay: delay,
            duration: duration,
            onComplete: onCompleteCallback,
        }
        SetScaleConfig(config, text0Dir);
        bob.addTweenTask('title.popup', config);
    }
    if (text1GameObject?: any) {
        var config = {
            targets: text1GameObject,
            delay: delay,
            duration: duration,
            onComplete: onCompleteCallback,
        }
        SetScaleConfig(config, text1Dir);
        bob.addTweenTask('text.popup', config);
    }

}

const DirToOriginMap = {
    right: { x: 0, y: 0.5 },
    left: { x: 1, y: 0.5 },
    up: { x: 0.5, y: 1 },
    down: { x: 0.5, y: 0 },
}

const DefaultOrigin = { x: 0.5, y: 0.5 };

var SetScaleConfig = function(config?: any, dir?: any) {
    switch (dir?: any) {
        case 'up':
        case 'down':
            config.scaleY = { start: 0, to: 1 };
            break;
        case 'left':
        case 'right':
            config.scaleX = { start: 0, to: 1 };
            break;

        default:
            config.scaleX = { start: 0, to: 1 };
            config.scaleY = { start: 0, to: 1 };
            break;
    }

    return config;
}

export default PopUp;