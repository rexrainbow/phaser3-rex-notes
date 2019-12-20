var GetTime = function (timeStamp) {
    var date = (timeStamp) ? (new Date(timeStamp)) : (new Date());
    var Jan1st = new Date(date.getFullYear(), 0, 1);
    var week = Math.ceil((((date - Jan1st) / 86400000) + Jan1st.getDay() + 1) / 7);
    return {
        d: date.getDate(),
        w: week,
        m: (date.getMonth() + 1),
        y: (date.getFullYear())
    };
}

export default GetTime;