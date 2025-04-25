const DefaultWorker = `\
importScripts('https://unpkg.com/comlink/dist/umd/comlink.js');
(() => {
    async function run(data, onBefore, onAfter) {
        var newData;
        if (onBefore) {
            newData = await onBefore(data);
            if (newData !== undefined) {
                data = newData;
            }
        }

        if (onAfter) {
            newData = await onAfter(data);
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