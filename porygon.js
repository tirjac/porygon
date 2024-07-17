'use strict';

/**
 *
 * @module porygon
 */

var porygon = {};

function py2_round(value) {
	// The polyline algorithm uses Python 2's way of rounding
	return Math.floor(Math.abs(value) + 0.5) * (value >= 0 ? 1 : -1);
}

function encode_fx(curr, prev, factor) {
	curr = py2_round(curr * factor);
	prev = py2_round(prev * factor);
	var coord = (curr - prev) * 2;
	if (coord < 0) {
		coord = -coord - 1
	}
	var output = '';
	while (coord >= 0x20) {
		output += String.fromCharCode((0x20 | (coord & 0x1f)) + 63);
		coord /= 32;
	}
	output += String.fromCharCode((coord | 0) + 63);
	return output;
}

/**
 * Decode a polyline string into a set of cvalues.
 *
 * @param {Number} items : No of items
 * @param {String} str : Polyline string, e.g. '_ih_pfA_hmFoezGwwqa@{msh@cneqP_qo]gyuC??s_L?_{rc@~uJ???_jP'
 * @param {Number} prec : Precision of the encoded cvalues.  The default value is 5.
 * @returns {Array}
 *
 */
porygon.decode = function(items, str, prec) {
	var index = 0,
		coord = [],
		actval = new Array(items).fill(0),
		factor = Math.pow(10, Number.isInteger(prec) ? prec : 5);

	while (index < str.length) {
		let my_byte = null,
		shift = 1,
		result = 0;
		for (let i=0; i < items; i++) {
			shift = 1;
			result = 0;
			do {
				my_byte = str.charCodeAt(index++) - 63;
				result += (my_byte & 0x1f) * shift;
				shift *= 32;
			} while (my_byte >= 0x20);

			let change = (result & 1) ? ((-result - 1) / 2) : (result / 2);
			actval[i] += change;
		}
		coord.push( actval.map(j => j/factor));
	}

	return coord;
};
/**
 * Encode a set of cvalues in a polyline string.
 *
 * @param {Number} items : No of items
 * @param {Array.<Array.<Number>>} coord : coord
 * @param {Number} prec : Precision of the encoded cvalues.  The default value is 5.
 * @returns {String}
 */
porygon.encode = function(items, coord, prec) {
	if (!coord.length) { return ''; }

	var factor = Math.pow(10, Number.isInteger(prec) ? prec : 5),
		output = '';

	for (let j=0; j < items; j++) {
		output += encode_fx(coord[0][j], 0, factor);
	}

	for (var i = 1; i < coord.length; i++) {
		var a = coord[i], b = coord[i - 1];
		for (let j=0; j < items; j++) {
			output += encode_fx(a[j], b[j], factor);
		}
	}

	return output;
};

if (typeof module === 'object' && module.exports) {
	module.exports = porygon;
}

