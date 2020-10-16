/**
 * Calculates the greatest common divisor.
 * @param {Number} a Fist integer number.
 * @param {Number} b Second integer number.
 */
function gcd(a, b) {
    return (b == 0 ? a : gcd(b, a % b));
}

/**
 * Determines the equation ax+by=c has a solution.\
 * Returns true if gcd(a,b) divides c, false otherwise.
 * @param {*} a Coefficient a.
 * @param {*} b Coefficient b.
 * @param {*} c Coefficient c.
 */
function solExists(a, b, c) {
    return (c % gcd(a, b) == 0);
}