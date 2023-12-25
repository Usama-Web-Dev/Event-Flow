


var randomize = require('randomatic')

export const generateSuggestedPassword = (pattern, length) => {
    return randomize(pattern, length);
}