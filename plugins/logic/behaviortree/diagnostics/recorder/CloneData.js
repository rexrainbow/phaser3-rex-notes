var CloneData = function (data) {
    if (data == null) {
        return data;
    }

    try {
        return JSON.parse(JSON.stringify(data));
    } catch (e) {
        return data;
    }
}

export default CloneData;
