namespace rsa{
    let bit_length:number;
    let key_min:number;
    let key_max:number;
    export function bitLength(length?:number){
        if(length!=undefined&&length!=null){
            bit_length=length;
        }
        key_min=1*Math.pow(2,bit_length);
        key_max=1*Math.pow(2,bit_length+1)-1;
        return bit_length;
    }
    export class user{
        private publicKey:number[]; // n,e
        constructor(key:number[]){
            this.publicKey=key;
        }
        public cipher(m:number):number{ // 0<=m<n
            let ret:number=(1);
            for(let i=0;(i)<this.publicKey[1];i++){
                ret=m*ret;
                ret=ret%this.publicKey[0];
            }
            return ret; //m^e=c(mod n)
        }
    }
    export class server{
        public publicKey:number[]; // n,e
        private privateKey:number[]; // p,q,lambda,d
        constructor(){
            this.publicKey=[];
            this.privateKey=[];
            this.privateKey.push(getPrime()); // p is prime
            this.privateKey.push(getPrime()); // q is prime
            while(this.privateKey[0]==this.privateKey[1]||this.privateKey[0]*this.privateKey[1]<=key_min){
                this.privateKey[0]=getPrime();
                this.privateKey[1]=getPrime();
            }
            this.publicKey.push(this.privateKey[0]*this.privateKey[1]); // n=pq
            this.privateKey.push(lcm(this.privateKey[0]-(1),this.privateKey[1]-(1))); // lambda(n)=lcm(lambda(p),lambda(q))=lcm(p-1,q-1)
            this.publicKey.push((0b11)); // 1<e<lambda have short bit-length small hamming weight (2) not too small
            while(this.publicKey[1]<this.privateKey[2]){ // maximize value of e
                this.publicKey[1]=this.publicKey[1]-(1);
                this.publicKey[1]=this.publicKey[1]*Math.pow(2,1);
                this.publicKey[1]=this.publicKey[1]+(1); // increase bit-length by 1;
            }
            this.publicKey[1]=this.publicKey[1]-(1);
            this.publicKey[1]=this.publicKey[1]*Math.pow(2,1);
            this.publicKey[1]=this.publicKey[1]+(1);
            while(gcd(this.publicKey[1],this.privateKey[2])!=(1)){ // gcd(e,lambda)=1
                this.publicKey[1]=this.publicKey[1]-(1);
                this.publicKey[1]=this.publicKey[1]/Math.pow(2,1);
                this.publicKey[1]=this.publicKey[1]+(1); // decrease bit-length by 1;
            }
            this.privateKey.push(modMultInv(this.publicKey[1],this.privateKey[2])); // d=e^-1(mod lambda)
            serial.writeNumbers([this.publicKey[0],this.publicKey[1]]);
            serial.writeNumbers([this.privateKey[0],this.privateKey[1],this.privateKey[2],this.privateKey[3]]);
        }
        public cipher(m:number):number{ // 0<=m<n
            let ret:number=(1);
            for(let i=0;(i)<this.publicKey[1];i++){
                ret=m*ret;
                ret=ret%this.publicKey[0];
            }
            return ret; //m^e=c(mod n)
        }
        public message(c:number):number{ // 0<=c<n
            let ret:number=(1);
            for(let i=0;(i)<this.privateKey[3];i++){
                ret=c*ret;
                ret=ret%this.publicKey[0];
            }
            return ret; //c^d=m(mod n)
        }
    }
    let prime:number[]=[(2)];
    export function initial_prime(primer:number[]):number[]{
        if(primer!=[]){
            prime=[];
            for(let i=0;i<primer.length;i++){
                let p:number=primer[i];
                prime.push((p));
            }
            return [];
        }else{
            let primal:number[]=[];
            for(let i=0;i<prime.length;i++){
                let p:number=prime(i);
                primal.push((p));
            }
            return primal;
        }
    }
    function getPrime():number{ // Sieve of Eratosthenes
        let str:string=",";
        for(let i=(prime[prime.length-1]);(i)<Math.sqrt(key_max);i++){
            let primality:boolean=false;
            while(!primality){
                i+=1;
                primality=true;
                for(let p of prime){
                    if(i%(p)==0){
                        primality=false;
                        break;
                    }
                }
            }
            if(primality){
                prime.push(i);
                serial.writeLine(""+i);
            }
        }
        let index:number=0;
        let indexlim:number[]=[0,prime.length-1];
        while(prime[index]<Math.sqrt(key_min)||prime[index]>Math.sqrt(key_max)){
            index=randint(indexlim[0],indexlim[1]);
            if(prime[index]<Math.sqrt(key_min)){
                indexlim[0]=index;
            }
            if(prime[index]>Math.sqrt(key_max)){
                indexlim[1]=index;
            }
        }
        return prime[index];
    }
    function gcd(a:number,b:number):number{ // Euclidean Algorithm
        let _a:number=a;
        let _b:number=b;
        let c:number;
        while(_b!=(0)){
            c=_b;
            _b=_a%_b;
            _a=c;
        }
        return _a;
    }
    function lcm(a:number,b:number):number{ // GCD LCM properties
        return (a*b)/gcd(a,b);
    }
    function modMultInv(a:number,n:number):number{ // Extended Euclidean Algorithm
        let t:number=(0);
        let t_:number=(1);
        let r:number=n;
        let r_:number=a;
        let c:number;
        while(r_>(0)){
            c=t_;
            t_=t-Math.floor(r/r_)*t_;
            t=c;
            c=r_;
            r_=r-Math.floor(r/r_)*r_;
            r=c;
        }
        if(r>1){
            return (0);
        }
        if(t<=0){
            t=t+n;
        }
        return t;
    }
}