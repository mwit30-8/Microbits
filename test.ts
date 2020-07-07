// tests go here; this will not be compiled when this package is used as an extension.
input.onButtonPressed(Button.A, function () {
    ABCNotation.setMeter(12, 8);
    ABCNotation.setTempo(3/8, 62);
    ABCNotation.setUNL(1/8);
    ABCNotation.setKey(ABCNotation.Key.Aflat,"");
    ABCNotation.playMelody("z3 z3 z3 E F A/ A/ | A6 A2 z c3/2 c/ B/ A/ | c6 c2 z B c c | c B/ A/ A A3 A2 z A B c | B6 z3 c B A | c3/2 B/ A A3 z3 e2 c | B B/ A/ A A3 A z A A B c | d2 d c2 B B A z A B c | B2 A c B3/2 E/ e e e f c B | c3 c2 B c3 c B A | c3 c2 B c3 c B A | d3 c2 B A3 E3 | c3 c d c B2 z c B A | c3 c2 B c3 c B A | c3 c2 B c3 c B A | d3 c B A A3 E2 B/ A/ | B3 B2 z c e2 c3/5 B3/5 c3/5 B3/5 A3/5 | A3 z3 a2 g f2 g | c3 z z3/2 E/ e2 d c/ B/ A A | A3 z3 a2 g f2 A | c3/2 B/ A A2 z c e e e2 f | c B A A c e a2 g f2 g | c3 A B c e2 d c2 d | c2 c/ B/ B3 d3 c z A/ B/ | c3 B2 z B3 A2 A/ A/ | c'3 b3 a3 g3 | f6 g z3/2 A/ c e A | c2 c c3 z3 A B c | c3/2 B/ A A3/2 A/ A A2 z A B c | d2 d c2 B B A2 A B c | B3 c3 e3 f e c | e3/2 c/ B/ A/ A3 A2 z z z/ c/ c/ e/ | e2 c c2 B B A2 A z/ B/ B/ c/ | d3 d d/ c/ e/ c/ c B/ A/ A z A B | B2 A c2 B e e e f c B | c3 c2 B c3 c B A | c3 c2 B c3 c B A | d3 c2 B A3 E3 | c3 c d c B2 E c B A | c3 c2 B c3 c B A/ A/ | c3 c2 B c3 c B A | d3 c B A A3 z E B | B3 z3 c e2 c3/5 B3/5 c3/5 B3/5 A3/5 | A3 A z2 a2 g f2 g | c3 c z3/2 E/ e2 d c2 B | A3 A z2 a2 g f2 A | c3/2 B A A2 z c e e e2 f | c B A A c e a2 g f2 g | c3 A B c e2 d c2 d | c3 B3 d3 c z A/ B/ | c3 B2 z B3 A z A/ A/ | A6 c3 c B A | B2 c/ B/ A6 E/ F/ A B | c3 B A B d3 c B A | B3 A3 e3 f3/2 e/ c | c3/2 B/ A/ B/ A3 a2 g f2 g | c3 z2 E e2 d c/ B/ A A | A3 z3 a2 g f2 A | c3/2 B/ A A3 c e e e2 f | c B A A c e f2 g/ f/ f2 e | c3 A B c e2 d c2 d | c3 B2 B d3 c3 | c3 B2 z B3 A z A | c3 B3 d3 c3 | c3 B2 z B3 A z G/ A/ | c'3 b3 a3 g3 | f6 g6 | a12 |");
})
input.onButtonPressed(Button.B, function () {
    ABCNotation.stop();
})