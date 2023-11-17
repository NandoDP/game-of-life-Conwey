conteneur = document.querySelector(".conteneur-grid");
stepsTag = document.querySelector(".steps b");
start_stop_Btn = document.querySelector(".start-stop");
resetBtn = document.querySelector(".reset");
clearBtn = document.querySelector(".clear");

// ----------------------------

let i = 0, interval;
let timer = 300;
shape = [48, 89];
nombreDeGeneration = 100;
motif = exploder;

// --------------------------------------------------------------

function start(X, shape, n) {
    A = grid(X, shape);
    B = allSteps(A, n);
    printGrid(A, shape);
};

start(motif, shape, nombreDeGeneration);

function startTimer(A, n, shape) {
    if (A == []) {
        return null;
    }
    B = allSteps(A, n);
    printGrid(B[0], shape)
    return setInterval(() => {
        i++;
        printGrid(B[i], shape);
        stepsTag.innerHTML = i;
        if (i == n) {
            interval = clearInterval(interval);
        }
    }, timer);
}

function clear() {
    i = 0;
    start([[]], shape, nombreDeGeneration);
    stepsTag.innerHTML = 0;
    f();
}

function f() {
    lis = Array.from(conteneur.querySelectorAll("li"));
    lis.forEach(li => {
        li.addEventListener("click", ({target: a})=>{
            // A copie la generation actuelle
            for (let j = 0; j < B[i].length; j++) {
                A[j] = B[i][j];
            }
            // on calcule la position de l'element sur qui on a cliquez dans la generation actuelle
            index = lis.indexOf(li);
            cord = [Math.floor(index/shape[1]), index%shape[1]];
            // on change sa valeur dans la matrice
            if (A[cord[0]][cord[1]] == 1) {
                A[cord[0]][cord[1]] = 0;
            } else {
                A[cord[0]][cord[1]] = 1;
            }
            i = 0;
            printGrid(A, shape);
            stepsTag.innerHTML = 0;
            f();
        });
    });
}

// ---------------------------------------------------------------

start_stop_Btn.addEventListener("click", ()=>{
    if (!interval) {
        interval = startTimer(A, nombreDeGeneration, shape);
        start_stop_Btn.querySelector('p').innerHTML = "Stop";
    } else {
        interval = clearInterval(interval);
        start_stop_Btn.querySelector('p').innerHTML = "Start";
    }
    f();
});

resetBtn.addEventListener("click", () => {
    i = 0;
    A = grid(motif, shape);
    printGrid(A, shape);
    stepsTag.innerHTML = 0;
    f();
});

clearBtn.addEventListener("click", clear);

f();