input.onButtonPressed(Button.A, function () {
    music.ringTone(262)
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            if (Math.randomBoolean() && led.point(x, y)) {
                led.plot(x, y)
            } else {
                led.unplot(x, y)
            }
        }
    }
    music.rest(music.beat(BeatFraction.Sixteenth))
})
input.onButtonPressed(Button.B, function () {
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            led.plot(x, y)
        }
    }
})
for (let x = 0; x <= 4; x++) {
    for (let y = 0; y <= 4; y++) {
        led.plot(x, y)
    }
}
