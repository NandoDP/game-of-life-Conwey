function start(X, n, shape) {
    B = allSteps(X, n);
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
    // li.classList.remove("white");
    // li.classList.add("black");
    console.log(lis.indexOf(li));

}

motif = [
    [0, 1, 1],
    [1, 1, 0],
    [0, 1, 0],
];
nombreDeGeneration = 100;
// shape = [48, 89]
shape = [45, 60]

A = grid(motif, shape);
start(A, nombreDeGeneration, shape);

lis = Array.from(conteneur.querySelectorAll("li"));
lis.forEach((li) => {
    li.addEventListener("click", ({target: a})=>{
        index = lis.indexOf(li);
        cord = [Math.floor(index/60), index%60];
        if (A[cord[0]][cord[1]] == 1) {
            A[cord[0]][cord[1]] = 0;
            a.classList.remove("black");
            a.classList.add("white");
        } else {
            A[cord[0]][cord[1]] = 1;
            a.classList.remove("white");
            a.classList.add("black");
        }
        start(A, nombreDeGeneration, shape);
        console.log("OK");
    });
});