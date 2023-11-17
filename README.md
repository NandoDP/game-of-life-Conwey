# Note
Afin de comprendre ce README il est important de noter que:
    # shape est un tableau de 2 elements: a et b,
    # une matrice de taille shape est un tableau de a tableaux de b elements chacun,
    # pour afficher une grille sur l'ecran on utilise une matrice de taille shape constituer 
      de 0 et 1 avec la fonction 'printGrid': 0 represente une cellule morte (case blanche) 
      1 represente une cellule vivante (case noir).
    # une matrice nulle est une matrice de taille shape remplie de 0.


L'utilisateur peut choisir de demarrer la simulation de la situation de depart en eppuyant sur 'Start' directement
oubien de l'effacer avec 'Clear' avant de cliquer sur les cellules a transformer et de demarrer avec 'Start'.
En appuyant sur 'Start' la fonction 'startTimer' (explication du fonctionnement en bas) se declanche et la
simulation s'observe sur l'ecran. Le boutton 'Start' se transforme en 'Stop' (qui appele la meme fonction), qui 
comme son nom l'indique peut mettre en pause la simulation.
Il est aussi possible de tous arreter et de revenir sur la situation de depart avec le boutton 'Reset'.



# Fonctions
### grid
Utiliser pour construire une matrice a partir d'un motif de depart (choisi par moi meme).
La premiere chose a faire est de creer une matrice nulle.
Ensuite la fonction remplie en son centre la matrice qui represente le motif de depart.
### exemple: 
    3 cellules => motif = [
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 0, 0],
                ]
    Pour le mettre au centre d'une matrice de taille [a, b] on lui ajoute E((b-3)/2) colonnes a gauche
    et E((b-3)/2) colonnes a droite. Ensuite on lui ajoute E((a-3)/2) lignes en haut et en bas aussi.
    


### clear
L'utilisateur peut choisir de ne pas demarrer avec le motif pré-defini. Dans ce cas le boutton  'Clear' permet
d'effacer entierement la grille en appelant la fonction 'grid' avec comme motif [] (le tableau vide).


### printGrid
On cree une chaine de caratere vide.
On parcours tous les elements de toutes les lignes de la matrice et on ajoute un li.div.black (element html) si 
l'element == 1 et li.div.white si l'element == 0.


### startTimer
On calcule et met dans un tableau les n generations suivantes de la situation de depart choisi grace a 'allSteps'.
Ensuite on parcours le tableau et on affiche avec 'printGrid' une generation toutes les 300ms avec la fonction
setInterval de JS. On arrete la simulation si toutes les generations sont affichées.


### allSteps
On cree un tableau qui contient n matrice nulle. Ensuite on parcours le tableau et chaque element sera remplacer
par l'evolution de l'element qui lui précéde grace a la fonction 'nextStep'.


### nextStep
une matrice X est donner en parametre.
On cree une matrice nulle D et pour chaque element (cellule) de position (x,y) (sauf ceux qui sont sur les 2 
lignes et les 2 colonnes a l'extremité) on affecte 1 si l'une des conditions suivantes est satisfaite (et 0 sinon):
- la somme des 8 elements qui entourent X[x][y] egale à 3
- la somme des 8 elements qui entourent X[x][y] egale à 2 et que l'element X[x][y] == 1
