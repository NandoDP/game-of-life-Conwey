/**
 * AGRANDIR LA MATRICE X AVEC LA TAILLE shape
 * X: motif (matrice), shape: taille de la grille (tableau de 2 entiers: nbr de lignes & nbr de colonnes)
 */
function makeMatrix(pattern, shape) {
    // Trouver les coordonnées pour centrer X dans la grande matrice
    var position = [Math.floor((shape[0] - pattern.length)/2), Math.floor((shape[1] - pattern[0].length)/2)];
    // Agrandir pattern
    pattern.map((row)=>{
        for (let i = 0; i < position[1]; i++) {
            row.unshift(0);
        }
        while (shape[1] > row.length) {
            row.push(0);
        }    
    });
    
    for (let i = 0; i < position[0]; i++) {
        pattern.unshift(Array(pattern[0].length).fill(0))
    }
    while (shape[0] > pattern.length) {
        pattern.push(Array(pattern[0].length).fill(0));
    }
    return pattern;
}

function getNextStep(matrix) {
    let nextStep = [Array(matrix[0].length).fill(0)];
    for (let i = 1; i < matrix.length - 1; i++) {
        row = [0];
        for (let j = 1; j < matrix[0].length - 1; j++) {
            s = matrix[i-1][j-1] + matrix[i-1][j] + matrix[i-1][j+1]
             + matrix[i][j-1] + matrix[i][j+1]
              + matrix[i+1][j-1] + matrix[i+1][j] + matrix[i+1][j+1];
            if (s == 3 || (s == 2 && matrix[i][j] == 1)) {
                row[j] = 1;
            } else {
                row[j] = 0;
            }
        }
        row.push(0);
        nextStep.push(row);
    }
    nextStep.push(Array(matrix[0].length).fill(0));

    return nextStep;
}

function getAllSteps(grid, maximumGeneration) {
    let steps = [];
    for (let i = 0; i < maximumGeneration; i++) {
        steps[i] = grid;
        grid = getNextStep(grid);
    }
    return steps;
}

function printGridFromMatrix(matrix, shape) {
    let str = "";
    for (let i = 0; i < shape[0]; i++) {
        for (let j = 0; j < shape[1]; j++) {
            if(matrix[i][j] == 1){
                str += "<li class='grid'><div class='case black'></div></li>";
            } else {
                str += "<li class='grid'><div class='case white'></div></li>";
            }
        }   
    }

    conteneur.innerHTML = str;
}