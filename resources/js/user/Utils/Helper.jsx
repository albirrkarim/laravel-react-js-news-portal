const str_limit = (str, len = 100) => {
    if (str.length > len) {
        str = str.substring(0, len) + "...";
    }
    return str;
};

const alphaNumeric = (txt) => {
    return txt
        .replace(/[^\w\s]/gi, "")
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();
};

export { str_limit, alphaNumeric };
