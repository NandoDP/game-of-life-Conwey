conteneur = document.querySelector(".conteneur-grid");
stepsTag = document.querySelector(".steps b");
startStopBtn = document.querySelector(".start-stop");
resetBtn = document.querySelector(".reset");
clearBtn = document.querySelector(".clear");
randomBtn = document.querySelector(".random");
selectTag = document.querySelector("select");
speedControleTag = document.querySelector(".speed-control");

/**
 * initialize variables
 */
let initialPattern = ten;
let maximumGenerationStep = 500;
let shape = [45, 80];
let timePerStep = 300;
let currenStep = 0, interval;
let makedMatrix;
let allGenerations;

function makeGridByPattern(pattern, shape, maximumGeneration) {
    makedMatrix = makeMatrix(pattern, shape);
    allGenerations = getAllSteps(makedMatrix, maximumGeneration);
    printGridFromMatrix(makedMatrix, shape);
};

makeGridByPattern(initialPattern, shape, maximumGenerationStep);

function start(makedMatrix, maximumGeneration, shape) {
    console.log('start');
    if (makedMatrix == [[]]) {
        return null;
    }

    allGenerations = getAllSteps(makedMatrix, maximumGeneration);
    
    printGridFromMatrix(allGenerations[0], shape)
    return setInterval(() => {
        currenStep++;
        printGridFromMatrix(allGenerations[currenStep], shape);
        stepsTag.innerHTML = currenStep;
        if (currenStep == maximumGeneration) {
            interval = clearInterval(interval);
        }
    }, timePerStep);
}

function changePattern(pattern) {
    currenStep = 0;
    makeGridByPattern(pattern, shape, maximumGenerationStep);
    stepsTag.innerHTML = 0;
    cellListener();
}

function cellListener() {
    lis = Array.from(conteneur.querySelectorAll("li"));
    lis.forEach(li => {
        li.addEventListener("click", ({target: a})=>{
            // Copie de la generation actuelle
            for (let j = 0; j < allGenerations[currenStep].length; j++) {
                makedMatrix[j] = allGenerations[currenStep][j];
            }
            // Calcul de la position de l'element sur qui on a cliquez dans la generation actuelle
            index = lis.indexOf(li);
            cord = [Math.floor(index/shape[1]), index%shape[1]];
            // Changer sa valeur dans la matrice
            if (makedMatrix[cord[0]][cord[1]] == 1) {
                makedMatrix[cord[0]][cord[1]] = 0;
            } else {
                makedMatrix[cord[0]][cord[1]] = 1;
            }
            currenStep = 0;
            printGridFromMatrix(makedMatrix, shape);
            stepsTag.innerHTML = 0;
            cellListener();
        });
    });
}

function startStop(fromStartStopBtn) {
    if (!interval && fromStartStopBtn) {
        interval = start(makedMatrix, maximumGenerationStep, shape);
        startStopBtn.querySelector('p').innerHTML = "Stop";
    } else {
        interval = clearInterval(interval);
        startStopBtn.querySelector('p').innerHTML = "Start";
    }
    cellListener();
}

for(const pattern in patterns){
    selectTag.innerHTML += "<option value='"+ pattern +"'>"+ pattern +"</option>";
}
selectTag.addEventListener("change", () => {
    initialPattern = patterns[selectTag.value];
    changePattern(initialPattern);
});

speedControleTag.querySelector("input").addEventListener("change", () => {
    timePerStep = parseInt(speedControleTag.querySelector("input").value);
    speedControleTag.querySelector("span").innerHTML = speedControleTag.querySelector("input").value+" ms";

});

startStopBtn.addEventListener("click", () => {
    startStop(true);
});

resetBtn.addEventListener("click", () => {
    startStop(false);
    currenStep = 0;
    makedMatrix = makeMatrix(initialPattern, shape);
    printGridFromMatrix(makedMatrix, shape);
    stepsTag.innerHTML = 0;
    cellListener();
});

clearBtn.addEventListener("click", () => {
    startStop(false);
    changePattern([[]]);
});

randomBtn.addEventListener("click", () => {
    startStop(false);
    randomPattern = [Array(shape[1]).fill(0)];
    for (let i = 1; i < shape[0] - 1; i++) {
        const element = [0];
        for (let j = 1; j < shape[1] - 1; j++) {
            Math.random() > 0.5 ? element.push(1) : element.push(0);
        }
        element.push(0)
        randomPattern.push(element);
    }
    randomPattern.push(Array(shape[1]).fill(0));
    changePattern(randomPattern);
});

cellListener();