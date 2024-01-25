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
        if (config.accept) {
            this.setAcceptCallback(config.accept, config.acceptScope);
        }
        if (config.reject) {
            this.setRejectCallback(config.reject, config.rejectScope);
        }

        this.onClickCallback = function () {
            if (this.confirmDialogEnable) {
                ConfirmAction(scene, this.confirmActionConfig);
            } else {
                this.runAcceptCallback();
            }
        }
        this.onClick(this.onClickCallback, this);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);

        this.confirmActionConfig = undefined;
        this.onClickCallback = undefined;
    }

    setAcceptCallback(callback, scope) {
        this.confirmActionConfig.accept = callback;
        this.confirmActionConfig.acceptScope = scope;
        return this;
    }

    setRejectCallback(callback, scope) {
        this.confirmActionConfig.reject = callback;
        this.confirmActionConfig.rejectScope = scope;
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

    runAcceptCallback() {
        var callback = this.confirmActionConfig.accept;
        var scope = this.confirmActionConfig.acceptScope;

        if (callback) {
            callback.call(scope);
        }

        return this;
    }
}

export default ConfirmActionButton;