/*
Morpion console.log 
Avec switch entre joueur (joueur O commence, switch avec joueur X)
Avec vérification d'entrée (entre 0 et 9)
Avec indication de fin de jeu
Manque la déclaration du gagnant
*/

// Initialisation des variables
let tableau = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
let valeurSubmit = document.getElementById("valeurSubmit");
let monFormulaire = document.getElementById("monFormulaire");
let morpion = [
  ["-", "-", "-"],
  ["-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

let joueur = "O";
let lignsuperieureGagnante = ["O", "O", "O"];
let lignsuperieure = [...morpion[0]];
// Initialisation de l'écouteur d'évenement
monFormulaire.addEventListener("submit", function (event) {
  event.preventDefault();
  let valeurInput = document.getElementById("valeurInput").value;

  valeurInputNumber = Number(valeurInput); // input tranformé en nombre
  let regex = /^[0-9]$/;
  if (!regex.test(valeurInputNumber)) {
    // Validation d'entrée grâce au regex
    return console.log("Je veux un nombre, entre 0 et 9 couillon");
  } else if (valeurInputNumber < 3) {
    // Changement de l'index du tableau indiqué par l'utilisateur par la variable joueur
    morpion[0][valeurInputNumber] = joueur;
    logMorpion();
    decrementArray(tableau, valeurInput);
    joueurSwitch();
    checkIfGameOver();
  } else if (valeurInputNumber < 6) {
    morpion[1][valeurInputNumber] = joueur;
    logMorpion();
    decrementArray(tableau, valeurInput);
    joueurSwitch();
    checkIfGameOver();
  } else if (valeurInputNumber < 9) {
    morpion[2][valeurInputNumber] = joueur;
    logMorpion();
    decrementArray(tableau, valeurInput);
    joueurSwitch();
    checkIfGameOver();
  }
});

/*
Explication du logMorpion:
Affiche le premier tableau du morpion morpion[0], puis récupère uniquement les 3 derniers élements du tableau (.slice(-3))
remplace les virgules par des espaces .join(" ") puis saute une ligne \n pour réitérer et afficher les 9 caractères
*/

const logMorpion = () => {
  console.log(
    `${morpion[0].slice(-3).join(" ")}\n${morpion[1]
      .slice(-3)
      .join(" ")}\n${morpion[2].slice(-3).join(" ")}`
  );
};

/*
Switch entre les deux joueurs
*/
const joueurSwitch = () => {
  if (joueur === "O") {
    joueur = "X";
    console.log(`C'est au tour de ${joueur}`);
    
  } else {
    joueur = "O";
    console.log(`C'est au tour de ${joueur}`);
  }
};

/*
Décrémenter le tableau de choix de case, afin de ne pas faire deux fois le même choix
*/

const decrementArray = (tableau, valeurInput) => {
  if (tableau.length > 0) {
    for (let i = tableau.length - 1; i >= 0; i--) {
      if (tableau[i] === valeurInput) {
        tableau.splice(i, 1);
        return console.log(`Chiffres à jouer: ${tableau}`);
      }
    }
  }
};

/*
Vérifie si le tableau est vide. Si oui, le jeu est terminé
*/

const checkIfGameOver = () => {
  if (tableau.length < 1) {
    return console.log(`jeu terminé!`);
  }
};

/*
    Vérification du gagnant ou de la gagnante
    
    Lignes Gagnantes:
    */

// let lignemilieu =
// let ligninferieure =

// let colonneGauche =
// let colonneMilieu =
// let colonneDroite =

// let diagonaleGaucheDroite =
// let diagonaleDroiteGauche =

// const arrayEquals = (lignsuperieure, lignsuperieureGagnante) => {
//   if (lignsuperieure.length !== lignsuperieureGagnante.length) return false;
//   for (let i = 0; i < lignsuperieure.length; i++) {
//     if (lignsuperieure[i] !== lignsuperieureGagnante[i]) return false;
//   }
//   return true;
// };
// let lignemilieu = [
//   ...([...morpion[1][0]] + [...morpion[1][1]] + [...morpion[1][2]]),
// ];
// let ligninferieure = [
//   ...([...morpion[2][0]] + [...morpion[2][1]] + [...morpion[2][2]]),
// ];

// let colonneGauche = [
//   ...([...morpion[0][0]] + [...morpion[1][0]] + [...morpion[2][0]]),
// ];
// let colonneMilieu = [
//   ...([...morpion[0][1]] + [...morpion[1][1]] + [...morpion[2][1]]),
// ];
// let colonneDroite = [
//   ...([...morpion[0][2]] + [...morpion[1][2]] + [...morpion[2][2]]),
// ];

// let diagonaleGaucheDroite = [
//   ...([...morpion[0][0]] + [...morpion[1][1]] + [...morpion[2][2]]),
// ];
// let diagonaleDroiteGauche = [
//   ...([...morpion[0][2]] + [...morpion[1][1]] + [...morpion[2][0]]),
// ];
