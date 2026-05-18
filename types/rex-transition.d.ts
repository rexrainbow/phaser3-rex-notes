export {};

type RexAnyFunction = (...args: any[]) => any;
type RexAnyPlugin = Record<string, any>;

declare module 'phaser' {
    interface Scene {
        [key: string]: any;
    }

    namespace GameObjects {
        interface GameObject {
            [key: string]: any;
        }

        interface GameObjectFactory {
            [key: `rex${string}`]: RexAnyFunction;
        }

        interface GameObjectCreator {
            [key: `rex${string}`]: RexAnyFunction;
        }
    }

    namespace Loader {
        interface LoaderPlugin {
            [key: `rex${string}`]: RexAnyFunction;
        }
    }

    namespace Plugins {
        interface PluginManager {
            get(key: string, autoStart?: boolean): RexAnyPlugin;
        }
    }

    namespace Physics.Arcade {
        interface Body {
            [key: string]: any;
        }

        interface StaticBody {
            [key: string]: any;
        }
    }
}

declare global {
    const Comlink: any;

    interface Object {
        [key: string]: any;
    }

    interface Function {
        [key: string]: any;
    }

    interface Window {
        webkitAudioContext: typeof AudioContext;
    }

    interface String {
        splice(start: number, deleteCount?: number, insert?: string): string;
    }
}

declare module 'chart.js/dist/Chart.js';
declare module 'lokijs/src/lokijs.js';
declare module 'papaparse/papaparse.js';
declare module 'papaparse/papaparse.min.js';
declare module '*.frag';
declare module '*.vert';
