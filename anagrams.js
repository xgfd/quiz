// Words to match
var words = ["dell", "ledl", "abc", "cba"];

var anagrams = {};

function invariance(word) {
    return word.split("").sort().join("");
    //return word.split("").reduce(function(mult, char){return char.charCodeAt(0) * mult;}, 1);
}

words.forEach(function(word) {
    var key = invariance(word);

    if (anagrams[key] !== null) {
        anagrams[key].push(word);
    } else {
        anagrams[key] = [word];
    }
});
