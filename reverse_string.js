//reverse a string
//in languages having mutable strings the following method reverses a string in place
function reverse(s) {
    s = s.split('');
    var len = s.length,
        halfIndex = Math.floor(len / 2) - 1,
        tmp;
    for (var i = 0; i <= halfIndex; i++) {
        tmp = s[len - i - 1];
        s[len - i - 1] = s[i];
        s[i] = tmp;
    }
    return s.join('');
}

//however modern languages like js have only immutable strings i.e. modification on strings creates new strings. The following naive method turns out to be fastest one. Credit: http://eddmann.com/posts/ten-ways-to-reverse-a-string-in-javascript/
function reverse(s) {
    var o = '';
    for (var i = s.length - 1; i >= 0; i--)
        o += s[i];
    return o;
}

//or
function reverse(s) {
    for (var i = s.length - 1, o = ''; i >= 0; o += s[i--]) {}
    return o;
}
