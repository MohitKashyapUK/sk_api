/**
 * Function to convert a date object to Indian Standard Time (IST) time zone.
 *
 * @returns {Date} The date object converted to IST time zone.
 */
function main() {
    // Date object
    const date = new Date();

    // UTC offset for IST is +5:30 hours
    const ISTOffset = 330 * 60 * 1000; // Offset in milliseconds

    // Obtain the UTC time of the input date
    const utcTime = date.getTime();

    // Calculate the IST time by adding the offset to the UTC time
    const istTime = new Date(utcTime + ISTOffset);

    return istTime;
}

module.exports = main;