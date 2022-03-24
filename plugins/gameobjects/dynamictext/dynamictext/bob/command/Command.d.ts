import Base from '../renderbase/RenderBase';

export default class Command extends Base {
    readonly type: 'command';

    name: string;

}