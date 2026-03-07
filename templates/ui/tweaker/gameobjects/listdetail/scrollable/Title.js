import Sizer from '../../../../sizer/Sizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Title extends Sizer {
    constructor(scene, config) {
        super(scene, {
            orientation: 0,
        });
        this.type = 'rexTweaker.ListDetail.EditorContainer.Title';

        var indexLabel = GetValue(config, 'editorIndexLabel');
        var displayNameLabel = GetValue(config, 'editorDisplayNameLabel');
        // More logic...
    }

    setTitle(indexConfig, displayNameConfig) {
        return this;
    }
}

export default Title;