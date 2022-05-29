// tests go here; this will not be compiled when this package is used as an extension.
let data = 0;
basic.forever(function() {
    if (false) {

    } else if (data % 2 == 0) {
        showData.temperature(-5, 50);
    } else if (data % 2 == 1) {
        showData.compass();
    } else {

    }
});
input.onButtonPressed(Button.A, function() {
    data += 1;
});
input.onButtonPressed(Button.B, function() {
    data -= 1;
});