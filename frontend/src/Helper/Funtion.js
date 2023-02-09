export const removeValuteEmpty = (object) => {
    const result = object;
    for (const key in result) {
        if (result[key] === '' || result[key] === undefined) {
            delete result[key];
        }
    }
    return result;
};

export const renderError = (ListError) => {
    let strErrors = '';
    Object.values(ListError).map((item) => {
        strErrors += item[0] + '-';
    });

    return strErrors.split('-').join('\n');
};

export const numberWithCommas = (x) => {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
};

export const capitalized = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};
