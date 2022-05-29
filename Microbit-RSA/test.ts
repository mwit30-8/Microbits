// tests go here; this will not be compiled when this package is used as an extension.
rsa.bitLength(25);
let client:any;
let info:string="";
let publicKey:number[]=[0,0];
input.onPinPressed(TouchPin.P0,function () {
    client=new rsa.server();
    publicKey=client.publicKey
    radio.sendValue("n",(publicKey[0]));
    radio.sendValue("e",(publicKey[1]));
    info="s";
});
let x:number=0;
input.onButtonPressed(Button.A,function () {
    led.toggle(x%5,Math.floor(x/5)%5);
});
input.onButtonPressed(Button.B,function () {
    x=(x+1)%25;
});
input.onButtonPressed(Button.AB,function () {
    if(info=="u"){
        let data:number=0;
        for(let x=0;x<25;x++){
            if(led.point(x%5,Math.floor(x/5)%5)){
                data+=Math.pow(2,x);
            }
        }
        serial.writeLine("data : "+data);
        let cipher:number=(client.cipher((data)));
        serial.writeLine("cipher : "+cipher);
        radio.sendNumber(cipher);
    }
});
radio.onReceivedNumber(function (receivedNumber: number) {
    let message:number=(client.message((receivedNumber)));
    serial.writeLine("message : "+message);
    for(let x=0;x<25;x++){
        if((message&Math.pow(2,x))==Math.pow(2,x)){
            led.plot(x%5,Math.floor(x/5)%5);
        } else {
            led.unplot(x%5,Math.floor(x/5)%5);
        }
    }
});
radio.onReceivedValue(function (name: string,value: number) {
    switch(name){
        case "n":publicKey[0]=(value);break;
        case "e":publicKey[1]=(value);break;
    }
    if(publicKey[0]!=null&&publicKey[1]!=null){
        client=new rsa.user(publicKey);
        info="u";
    }
});