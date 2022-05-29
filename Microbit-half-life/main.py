def on_button_pressed_a():
    global HT, A
    for index in range(10 - A):
        HT = randint(1, 2)
        if HT == 2:
            basic.show_string("H")
        if HT == 1:
            basic.show_string("T")
            A += 1
        music.play_tone(262, music.beat(BeatFraction.WHOLE))
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global A
    A = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

HT = 0
A = 0
A = 0