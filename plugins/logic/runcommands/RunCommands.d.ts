export default RunCommands;

declare namespace RunCommands {

    /**
     * Configuration options for running command queues.
     */
    interface IConfig {
        /**
         * Execute queue in reverse order.
         */
        reverse?: boolean,
        /**
         * Argument conversion callback or enable flag.
         */
        argsConvert?: ((s: any, cmd?: any[]) => any) | boolean,

    }

}

/**
 * Run a command queue with optional scope and configuration.
 *
 * @param queue - Command queue.
 * @param scope - Execution scope.
 * @param config - Run configuration.
 * @returns Execution result.
 */
declare function RunCommands(
    queue: any[],
    scope?: object,
    config?: RunCommands.IConfig
): any;
