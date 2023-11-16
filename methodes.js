function grid(X, shape) {
    var pos = [Math.floor((shape[0] - X.length)/2), Math.floor((shape[1] - X[0].length)/2)]
    X.map((a)=>{
        for (let i = 0; i < pos[1]; i++) {
            a.unshift(0);
        }
        while (shape[1] > a.length) {
            a.push(0);
        }    
    })
    for (let i = 0; i < pos[0]; i++) {
        X.unshift(Array(X[0].length).fill(0))
    }
    while (shape[0] > X.length) {
        X.push(Array(X[0].length).fill(0));
    }
    return X;
}

function nextStep(X) {
    let D = [Array(X[0].length).fill(0)];
    for (let i = 1; i < X.length - 1; i++) {
        Z = [0];
        for (let j = 1; j < X[0].length - 1; j++) {
            s = X[i-1][j-1] + X[i-1][j] + X[i-1][j+1]
             + X[i][j-1] + X[i][j+1]
              + X[i+1][j-1] + X[i+1][j] + X[i+1][j+1];
            if (s == 3 || (s == 2 && X[i][j] == 1)) {
                Z[j] = 1;
            } else {
                Z[j] = 0;
            }
        }
        Z.push(0);
        D.push(Z);
    }
    D.push(Array(X[0].length).fill(0));

    return D;
}

function allSteps(X, n) {
    let D = Array(X.length).fill(Array(X[0].length).fill(0));
    let steps = Array(n).fill(D);
    for (let i = 0; i < n; i++) {
        steps[i] = X;
        X = nextStep(X);
    }
    return steps;
}

function printGrid(X, shape) {
    let str = "";
    for (let i = 0; i < shape[0]; i++) {
        for (let j = 0; j < shape[1]; j++) {
            if(X[i][j] == 1){
                str += "<li class='grid'><div class='case black'></div></li>";
            } else {
                str += "<li class='grid'><div class='case white'></div></li>";
            }
        }   
    }

    conteneur.innerHTML = str;
}