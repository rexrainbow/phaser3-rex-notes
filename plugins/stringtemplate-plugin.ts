import StringTemplate from './stringtemplate';
import Compile from './string/stringtemplate/utils/Complile';
import Render from './string/stringtemplate/utils/Render';
import CreateProxyContext from './utils/proxy/createproxycontext/CreateProxyContext';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class StringTemplatePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config?: any) {
        return new StringTemplate(config);
    }

    compile(content?: any, config?: any) {
        return Compile(content, config);
    }

    render(content?: any, view?: any, config?: any) {
        return Render(content, view, config);
    }

    createProxyContext(config?: any, baseContext?: any) {
        return CreateProxyContext(config, baseContext);
    }
}

SetValue(window, 'RexPlugins.StringTemplate', StringTemplate);

export default StringTemplatePlugin;