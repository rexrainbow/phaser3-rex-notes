import { Tweaker } from '../../ui/ui-components';
import DefaultConfig from './DefaultConfig';

class PropertiesTweaker extends Tweaker {
    constructor(scene, config) {
        if (config === undefined) {
            config = DefaultConfig;
        }
        super(scene, config);

        this
            .addInput({
                bindingKey: 'x', title: 'x',
                view: 'number', monitor: true,
            })
            .addInput({
                bindingKey: 'y', title: 'y',
                view: 'number', monitor: true,
            })
            .addInput({
                bindingKey: 'displayWidth', title: 'width',
                view: 'number', monitor: true,
            })
            .addInput({
                bindingKey: 'displayHeight', title: 'height',
                view: 'number', monitor: true,
            })
            .addInput({
                bindingKey: 'angle', title: 'angle',
                view: 'number', monitor: true,
            })

    }
}

export default PropertiesTweaker;