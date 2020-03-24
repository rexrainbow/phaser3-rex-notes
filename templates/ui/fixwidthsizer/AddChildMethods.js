import Container from '../container/Container.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;
const ContainerMoveTo = Container.prototype.moveTo;

export default {
    add(gameObject, paddingConfig, childKey) {
        if (gameObject === '\n') {
            this.addNewLine();
            return this;
        }

        this.pin(gameObject);

        if (IsPlainObject(paddingConfig)) {
            var config = paddingConfig;
            paddingConfig = GetValue(config, 'padding', 0);
            childKey = GetValue(config, 'key', undefined);
        }
        if (paddingConfig === undefined) {
            paddingConfig = 0;
        }

        var config = this.getSizerConfig(gameObject);
        config.align = ALIGN_CENTER;
        config.padding = GetBoundsConfig(paddingConfig);
        this.sizerChildren.push(gameObject);

        if (childKey !== undefined) {
            this.addChildrenMap(childKey, gameObject)
        }
        return this;
    },

    addNewLine() {
        this.sizerChildren.push('\n');
        return this;
    },

    insert(index, gameObject, paddingConfig, expand) {
        this.add(gameObject, paddingConfig, expand);
        ContainerMoveTo.call(this, gameObject, index);
        return this;
    }
}