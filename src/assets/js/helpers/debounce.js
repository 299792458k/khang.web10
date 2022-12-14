/**
* xử lý debounce
* @param {fn} function cần thực hiện sau timeout
* @param {delay} thời gian timeout
* @returns null
* Created By KhangPC (12/12/2022)
*/
const debounce = function debounce(fn, delay) {
    let timeoutID;
    return function () {
        console.log(timeoutID);
        clearTimeout(timeoutID);
        var args = arguments;
        var that = this;
        timeoutID = setTimeout(function () {
            fn.apply(that, args);
        }, delay);
        console.log(timeoutID);
    };
};

export default debounce;