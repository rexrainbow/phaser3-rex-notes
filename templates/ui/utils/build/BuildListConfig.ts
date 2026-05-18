import DeepClone from '../../../../plugins/utils/object/DeepClone';
import BuildLabelConfig from './BuildLabelConfig';
import CreateLabel from './CreateLabel';
import CreateBackground from './CreateBackground';

var BuildListConfig = function(scene?: any, config?: any, creators?: any) {
    config = (config) ? DeepClone(config) : {};

    if (creators === undefined) { creators = {} }

    var labelConfig = config.label || config.button;
    var listButtonConfig = config.button || config.label;
    delete config.label;
    delete config.button;

    var labelCreator = creators.label || creators.button || creators;
    var listButtonCreator = creators.button || creators.label || creators;

    var listConfig = BuildLabelConfig(scene, labelConfig, labelCreator);
    listConfig.list = config.list || {};

    listConfig.list.createButtonCallback = function(scene?: any, option?: any) {
        var gameObject = CreateLabel(scene, listButtonConfig, listButtonCreator)
            .resetDisplayContent(option)

        if (option.hasOwnProperty('value')) {
            gameObject.value = option.value;
        }
        return gameObject;
    }

    var trackConfig = config.track;
    if (trackConfig?: any) {
        listConfig.list.createTrackCallback = function(scene?: any) {
            return CreateBackground(scene, trackConfig);
        }
        delete config.track;
    }

    var thumbConfig = config.thumb;
    if (thumbConfig?: any) {
        listConfig.list.createThumbCallback = function(scene?: any) {
            return CreateBackground(scene, thumbConfig);
        }
        delete config.thumb;
    }

    listConfig.list.onButtonOver = function(button?: any, index?: any, pointer?: any, event?: any) {
        if (button.setHoverState) {
            button.setHoverState(true);
        }
    }
    listConfig.list.onButtonOut = function(button?: any, index?: any, pointer?: any, event?: any) {
        if (button.setHoverState) {
            button.setHoverState(false);
        }
    }

    return listConfig;
}

export default BuildListConfig;