export const multiFilter = (arr: Object[], filters: Object) => {
    const filterKeys = Object.keys(filters);
    return arr.filter(eachObj => {
        return filterKeys.every(eachKey => {
            if (!filters[eachKey].length) {
                return true; // passing an empty filter means that filter is ignored.
            }
            return filters[eachKey].includes(eachObj[eachKey]);
        });
    });
};