import Label from '../label/Label.js';
import ConfirmAction from '../confirmdialog/ConfirmAction.js';
import Clone from '../../../plugins/utils/object/Clone.js';

class ConfirmActionButton extends Label {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        this.type = 'rexConfirmActionButton';

        this.setConfirmDialogEnable();

        this.confirmActionConfig = Clone(config.confirmDialog || {});
        if (config.confirm) {
            this.setConfirmCallback(config.confirm, config.confirmScope);
        }
        if (config.cancel) {
            this.setCancelCallback(config.cancel, config.cancelScope);
        }

        this.onClickCallback = function () {
            if (this.confirmDialogEnable) {
                if (this.confirmDialog) {
                    return;
                }

                this.confirmDialog = ConfirmAction(scene, this.confirmActionConfig);
                this.confirmDialog.once('destroy', function () {
                    this.confirmDialog = undefined;
                }, this);

            } else {
                this.runConfirmCallback();
            }
        }
        this.onClick(this.onClickCallback, this);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        if (this.confirmDialog) {
            this.confirmDialog.destroy();
        }

        super.destroy(fromScene);

        this.confirmActionConfig = undefined;
        this.onClickCallback = undefined;
        this.confirmDialog = undefined;
    }

    setConfirmCallback(callback, scope) {
        this.confirmActionConfig.confirm = callback;
        this.confirmActionConfig.confirmScope = scope;
        return this;
    }

    setCancelCallback(callback, scope) {
        this.confirmActionConfig.cancel = callback;
        this.confirmActionConfig.cancelScope = scope;
        return this;
    }

    setConfirmDialogContent(content) {
        this.confirmActionConfig.content = content;
        return this;
    }

    setConfitmDialogStyle(style) {
        this.confirmActionConfig.style = style;
        return this;
    }

    setConfitmDialogModalConfig(config) {
        this.confirmActionConfig.modal = config;
        return this;
    }

    setConfirmDialogEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.confirmDialogEnable = enable;
        return this;
    }

    runConfirmCallback() {
        var callback = this.confirmActionConfig.confirm;
        var scope = this.confirmActionConfig.confirmScope;

        if (callback) {
            callback.call(scope);
        }

        return this;
    }
}

export default ConfirmActionButton;