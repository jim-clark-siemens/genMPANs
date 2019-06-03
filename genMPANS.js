Math.log10 = Math.log10 || function(x) {
  return Math.log(x) * Math.LOG10E;
};

function finishMPAN(mpanstub) {
    "use strict";
    var primes = [3, 5, 7, 13, 17, 19, 23, 29, 31, 37, 41, 43];
    var sum = 0;
    primes.forEach(function (v,i) {
        var len=Math.floor(Math.log10(mpanstub)) - i;
        sum += (Math.floor(mpanstub/Math.pow(10,len)) % 10)*v|0;
    });
    return mpanstub.toString()+(sum % 11 % 10);
}

function genMPANS(n,s) {
    "use strict";
    var i=0;
    var j=1000;
    var j_orig=j;
    if (!s || !(/^[0-9]{1,11}$/).test(s)) {
       console.log("Invalid start string provided ("+s+")");
       s="";
    }
    var mult=Math.pow(10,12-s.length)-1;
    console.log("Start string is "+s+", multiplier is therefore "+mult);
    var m=0;
    while (i<n && j>0) {
        m=Math.round(Math.random()*mult);
        if (m>0) {
            m=("000000000000"+m).substr(12-Math.floor(Math.log10(mult))+Math.floor(Math.log10(m)));
        } else {
            m=("000000000000"+m).substr(12-Math.floor(Math.log10(mult)));
        }
        console.log(finishMPAN(s+m));
        i+=1;
        j-=1;
    }
    if (j<=1) {
        console.log("WARNING: Max number of attempts ("+j_orig+") reached!");
    }
    console.log("Complete. "+i+" MPANS generated from "+(j_orig-j)+" attempts, conversion is "+(i/(j_orig-j)).toFixed(2));
}
