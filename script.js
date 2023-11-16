conteneur = document.querySelector(".conteneur-grid");
stepsTag = document.querySelector(".steps b");
refreshBtn = document.querySelector(".start");
resetBtn = document.querySelector(".reset");


let i = 0, interval;
shape = [45, 60];
nombreDeGeneration = 100;
motif = exploder; 

A = grid(motif, shape);
printGrid(A, shape);



function startTimer(A, n, shape) {
    B = allSteps(A, n);
    printGrid(B[0], shape)
    return setInterval(() => {
        i++;
        printGrid(B[i], shape);
        stepsTag.innerHTML = i;
        if (i == n) {
            interval = clearInterval(interval);
        }
    }, 300);
}

function reset() {
    i = 0;
    A = grid(motif, shape);
    printGrid(A, shape);
    stepsTag.innerHTML = 0;
}


refreshBtn.addEventListener("click", ()=>{
    if (!interval) {
        refreshBtn.querySelector('p').innerHTML = "Stop";
        interval = startTimer(A, nombreDeGeneration, shape);
    } else {
        interval = clearInterval(interval);
        refreshBtn.querySelector('p').innerHTML = "Start";
    }
});

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
            cord = [Math.floor(index/60), index%60];
            // on change sa valeur dans la matrice
            if (A[cord[0]][cord[1]] == 1) {
                A[cord[0]][cord[1]] = 0;
            } else {
                A[cord[0]][cord[1]] = 1;
            }
            i = 0;
            printGrid(A, shape);
            stepsTag.innerHTML = 0;
        });
    });
}

resetBtn.addEventListener("click", reset);

setInterval(() => {
    f();
}, 100);
