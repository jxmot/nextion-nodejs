module.exports = (function()  {

    wxicons = {
    };

    const icons = [
        '00u',
        '01d',
        '01n',
        '02d',
        '03d',
        '04d',
        '04n',
        '10d',
        '10n',
        '11d',
        '11n',
        '13d',
        '13n',
        '50d',
        '50n',
    ];

    /*
    */
    wxicons.getIndex = function(icon = '') {
        let idx = icons.indexOf(icon);
        if(idx === -1) return 0;
        return idx;
    };

    return wxicons;
})();
