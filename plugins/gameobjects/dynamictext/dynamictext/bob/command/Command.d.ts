import Base from '../Base';

/**
 * Command bob for executing callbacks in flow.
 */
export default class Command extends Base {
    /**
     * Bob type.
     */
    readonly type: 'command';

    /**
     * Command name.
     */
    name: string;

}
