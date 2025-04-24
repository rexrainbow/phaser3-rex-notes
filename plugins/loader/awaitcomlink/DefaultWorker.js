const DefaultWorker = `\
importScripts('https://unpkg.com/comlink/dist/umd/comlink.js');

(() => {
    async function run(data, onBefore, onEnd) {
        var newData;
        if (onBefore) {
            newData = await onBefore(data);
            if (newData !== undefined) {
                data = newData;
            }
        }

        if (onEnd) {
            newData = await onEnd(data);
            if (newData !== undefined) {
                data = newData;
            }
        }

        return data;
    }
    Comlink.expose(run);
})();\
`;

export default DefaultWorker;