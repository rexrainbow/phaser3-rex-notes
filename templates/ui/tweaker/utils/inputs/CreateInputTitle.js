var CreateInputTitle = function (maker, config) {
    var gameObject = maker.make({
        $class: 'InputTitle'
    });

    if (config.title) {
        gameObject.setText(config.title);
    }
    if (config.icon) {
        gameObject.setTexture(config.icon, config.iconFrame);
    }

    return gameObject;
}
export default CreateInputTitle;