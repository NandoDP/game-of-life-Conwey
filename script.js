// const lis = document.querySelectorAll(".li");
conteneur = document.querySelector(".conteneur-grid");
stepsTag = document.querySelector(".steps b");
refreshBtn = document.querySelector(".start");
resetBtn = document.querySelector(".reset");


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
                // str += "<li class='grid'><div class='li black'></div></li>";
                str += "<div class='li black'></div>";
            } else {
                // str += "<li class='grid'><div class='li white'></div></li>";
                str += "<div class='li white'></div>";
            }
        }   
    }

    conteneur.innerHTML = str;
}



function start(X, n, shape) {
    A = grid(X, shape);
    B = allSteps(A, n);
    printGrid(B[0], shape)

    let i = 0;
    let interval;

    function startTimer() {
        return setInterval(() => {
            i++;
            printGrid(B[i], shape);
            stepsTag.innerHTML = i;
            if (i == n) {
                interval = clearInterval(interval);
            }
        }, 500);
    }

    refreshBtn.addEventListener("click", ()=>{
        if (!interval) {
            refreshBtn.querySelector('p').innerHTML = "Stop";
            interval = startTimer();
        } else {
            interval = clearInterval(interval);
            refreshBtn.querySelector('p').innerHTML = "Start";
        }
    });

    resetBtn.addEventListener("click", ()=>{
        i = 0;
        printGrid(B[0], shape);
        stepsTag.innerHTML = 0;
    });
}

function change({target: li}) {
    
}

motif = [
    [0, 1, 1],
    [1, 1, 0],
    [0, 1, 0],
];
nombreDeGeneration = 100;
shape = [48, 89]

start(motif, nombreDeGeneration, shape);

// lis.forEach(li => {
//     li.addEventListener("click", change);
// });