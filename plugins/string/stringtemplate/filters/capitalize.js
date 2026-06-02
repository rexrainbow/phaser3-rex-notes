var Capitalize = function (value) {
    value = String(value);
    return (value.length === 0) ? value : value.charAt(0).toUpperCase() + value.slice(1);
}

export default Capitalize;
