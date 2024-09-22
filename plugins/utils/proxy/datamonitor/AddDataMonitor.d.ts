import EventEmitter from 'eventemitter3';

export default function AddDataMonitor<T>(config: {
    data?: T,
    eventEmitter: EventEmitter,
    eventNames?: {
        addKey?: string,
        setKey?: string,
        deleteKey?: string
    },
    parentPath?: string,
}): T;

