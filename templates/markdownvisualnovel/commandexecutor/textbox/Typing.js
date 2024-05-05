var Typing = function (
    gameObject,
    {
        text,
        displayName,
        icon, iconFrame,
        name, expression,
        typingSpeed,
        iconCrossDuration, iconCrossMode = 'crossFade',
        wait = true,
    } = {},
    commandExecutor,
    eventSheetManager, eventSheet
) {

    if (displayName === null) {
        var title = gameObject.getElement('title').setText('');
        gameObject.setChildAlpha(title, 0);
    } else if (displayName) {
        var title = gameObject.getElement('title').setText(displayName);
        gameObject.setChildAlpha(title, 1);
    }

    var iconGameObject = gameObject.getElement('icon');
    if (iconGameObject) {
        if (name || expression) {
            var frameDelimiter = gameObject.frameDelimiter;
            var tokens = gameObject.frame.name.split(frameDelimiter);
            name = name || tokens[0];
            expression = expression || tokens[1];
            iconFrame = name + frameDelimiter + expression;
        }

        if (icon || iconFrame) {
            icon = icon || iconGameObject.texture.key;
            iconFrame = iconFrame || '__BASE';

            // Don't do transition if texture is not changed
            if ((icon !== iconGameObject.texture.key) || (iconFrame !== iconGameObject.frame.name)) {
                if (iconCrossDuration === undefined) {
                    iconCrossDuration = eventSheetManager.getData('$transitionDuration');
                }
                iconGameObject.setDuration(iconCrossDuration);
                iconGameObject.transit(icon, iconFrame, iconCrossMode);
            }

        }

        if (icon === null) {
            gameObject.hide(iconGameObject);
        } else {
            gameObject.show(iconGameObject);
        }
    }

    gameObject.layout();

    if (text) {
        if (typingSpeed === undefined) {
            typingSpeed = eventSheetManager.getData('$typingSpeed');
        }

        if (wait) {
            // Wait until typing complete
            commandExecutor.waitEvent(gameObject, 'complete2');
        }

        var onClick = function () {
            if (gameObject.isTyping) {
                // Wait clicking for typing next page, 
                // or emitting 'complete2' event
                gameObject
                    .once('click', onClick)
                    .stop(true);

                eventSheetManager.emit('pause.input');
                gameObject.once('click', function () {
                    eventSheetManager.emit('resume.input');
                })

            } else if (!gameObject.isLastPage) {
                // Typing next page, interrupted by click event
                gameObject
                    .once('click', onClick)
                    .typeNextPage();

            } else {
                gameObject.emit('complete2');

            }
        }

        gameObject
            .once('click', onClick)
            .start(text, typingSpeed);
    }
};

export default Typing;


// https://mermaid.live/edit#pako:eNptkU1vgzAMhv8K8hkQ5Ts57NTdNmnSepq4RMSjqCWJQtDKgP--NC1jmpqT_frR69ieoJYcgUKjmTp6h30lKuHZ1xumjRcET56SrTCoufy6l_4IDmj7w6ha0UxrsNy4NXXQPGI_e4o1iII_qgs5W-WF9ebNQtMW_rqtwsYLvJir5WPCdaxlp85ocJ3r_oPHk61-_6vgQ4e6Yy23m5qubAXmiB1WQG3ImT5VUInFcoPizOAzb43UQI0e0Ac2GPk-inrNb8y-ZXbpHdBPdu6tqpj4kHLL0Xm83s7jruQYoBNcgO7iNCzTIs-iIs-TMslLH0agQRJHYUFKQuKIkDLP8sWHb2e7C1MLkswSJYmTJF1-AI4ApWA
/*
graph TD

    start --> pointerdown
    pointerdown --> isTyping{isTyping}
    isTyping --> |yes| pageend
    isTyping --> |no| isLastPage{isLastPage}
    isLastPage --> |no| nextpage
    isLastPage --> |yes| complete

    pageend --> pointerdown
    nextpage --> pointerdown
*/