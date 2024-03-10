/*
Morpion console.log 
Avec switch entre joueur (joueur O commence, switch avec joueur X)
Avec vérification d'entrée (entre 0 et 9)
Avec indication de fin de jeu
Avec changement de couleur selon joueur
Avec la vérification que 2 joueurs ne jouent pas la même case
Manque la déclaration du gagnant
*/

// Initialisation des variables
let tableau = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
let tableauBis = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
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
  } // Vérification que la case n'est pas déjà utilisé
  if (verifyNumber() === true) {
    return console.log("choisir un autre nombre");
  } else if (valeurInputNumber < 3) {

    // Changement de l'index du tableau indiqué par l'utilisateur via valeurInputNumber par la variable joueur
    morpion[0][valeurInputNumber] = joueur;
    decrementArray(tableau, valeurInput);
    logMorpion();
    joueurSwitch();
    checkIfGameOver();
    colorChangeCase();
  } else if (valeurInputNumber < 6) {
    morpion[1][valeurInputNumber] = joueur;
    decrementArray(tableau, valeurInput);
    logMorpion();
    joueurSwitch();
    checkIfGameOver();
    colorChangeCase();
  } else if (valeurInputNumber < 9) {
    morpion[2][valeurInputNumber] = joueur;
    decrementArray(tableau, valeurInput);
    logMorpion();
    joueurSwitch();
    checkIfGameOver();
    colorChangeCase();
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
        tableau[i] = "Utilisé";
        return console.log(`Chiffres à jouer: ${tableau}`);
      }
    }
  }
};

const verifyNumber = () => {
  if (tableau[valeurInputNumber] === "Utilisé") {
    return true;
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
Change la couleur des cases du morpion selon le joueur
*/

const colorChangeCase = () => {
  let cases = document.getElementsByClassName("case");
  if (joueur === "O") {
    cases[valeurInputNumber].style.background = "red";
  } else if (joueur === "X") {
    cases[valeurInputNumber].style.background = "blue";
  } else {
    console.log("chelouuuu");
  }
};
