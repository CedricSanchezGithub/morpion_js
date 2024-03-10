/*
Morpion console.log 
Avec switch entre joueur (joueur O commence, switch avec joueur X)
Avec vérification d'entrée (entre 0 et 9)
Avec indication de fin de jeu
Avec changement de couleur selon joueur
Avec la vérification que 2 joueurs ne jouent pas la même case
Avec la déclaration du gagnant
*/

// Initialisation des variables
let tableau = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
let tableauBis = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
let valeurSubmit = document.getElementById("valeurSubmit");
let monFormulaire = document.getElementById("monFormulaire");
const messageErreur = document.getElementById("erreur");
const messageInfo = document.getElementById("info");
const joueurInfo = document.getElementById("joueur");
const joueurOscore = document.getElementById("scoreO");
const joueurXscore = document.getElementById("scoreX");
let morpion = [
  ["-", "-", "-"],
  ["-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

let joueur = "O";
let lignsuperieureGagnante = ["O", "O", "O"];
let lignsuperieure = [...morpion[0]];
let scoreXvalue = 0;
let scoreOvalue = 0;

// Initialisation de l'écouteur d'évenement
monFormulaire.addEventListener("submit", function (event) {
  event.preventDefault();
  let valeurInput = document.getElementById("valeurInput").value;

  valeurInputNumber = Number(valeurInput); // input tranformé en nombre
  let regex = /^[0-9]$/;
  if (!regex.test(valeurInputNumber)) {
    // Validation d'entrée grâce au regex
    console.log("Je veux un nombre, entre 0 et 8 couillon");
    messageInfo.style.display = "none";
    messageErreur.style.display = "inline";
    return (messageErreur.innerText =
      "Je veux un nombre, entre 0 et 9 couillon");
  } // Vérification que la case n'est pas déjà utilisé
  if (verifyNumber() === true) {
    messageErreur.innerText = "Choisir un autre chiffre";
    messageInfo.style.display = "none";
    messageErreur.style.display = "inline";
    return console.log("Choisir un autre chiffre");
  } else if (valeurInputNumber < 3) {
    // Changement de l'index du tableau indiqué par l'utilisateur via valeurInputNumber par la variable joueur
    morpion[0][valeurInputNumber] = joueur;
    decrementArray(tableau, valeurInput);
    logMorpion();
    theWinnerIs();
    checkIfGameOver(valeurInput);
    joueurSwitch();
    colorChangeCase();
  } else if (valeurInputNumber < 6) {
    morpion[1][valeurInputNumber] = joueur;
    decrementArray(tableau, valeurInput);
    logMorpion();
    theWinnerIs();
    checkIfGameOver(valeurInput);
    joueurSwitch();
    colorChangeCase();
  } else if (valeurInputNumber < 9) {
    morpion[2][valeurInputNumber] = joueur;
    decrementArray(tableau, valeurInput);
    logMorpion();
    theWinnerIs();
    checkIfGameOver(valeurInput);
    joueurSwitch();
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
    joueurInfo.innerText = `C'est au joueur ${joueur} de jouer`;
    console.log(`C'est au tour de ${joueur}`);
  } else {
    joueur = "O";
    joueurInfo.innerText = `C'est au joueur ${joueur} de jouer`;
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
        tableau[i] = " ";
        messageInfo.style.display = "inline";
        messageInfo.innerText = `Chiffres à jouer: ${tableau.join(" ")}`;
        messageErreur.style.display = "none";
        return console.log(`Chiffres à jouer: ${tableau.join(" ")}`);
      }
    }
  }
};

let index = tableauBis.indexOf("valeurInput");
if (index !== -1) {
  tableauBis.splice(index, 1);
}

const verifyNumber = () => {
  if (tableau[valeurInputNumber] === " ") {
    return true;
  }
};

/*
Vérifie si le tableau est vide. Si oui, le jeu est terminé
*/

const checkIfGameOver = (valeurInput) => {
  let index = tableauBis.indexOf(valeurInput);
  if (index !== -1) {
    tableauBis.splice(index, 1);
  }
  if (tableauBis.length < 1) {
    messageInfo.style.display = "inline";
    messageInfo.innerText = "Jeu terminé!";
    messageErreur.style.display = "none";
    return console.log(`jeu terminé!`);
  }
};

/*
Change la couleur des cases du morpion selon le joueur
*/

const colorChangeCase = () => {
  let cases = document.getElementsByClassName("case");
  if (joueur === "O") {
    cases[valeurInputNumber].style.background = "rgb(84, 84, 231)";
    cases[valeurInputNumber].style.color = "black";
  } else if (joueur === "X") {
    cases[valeurInputNumber].style.background = "rgb(231, 138, 84)";
    cases[valeurInputNumber].style.color = "black";
  } else {
    console.log("chelouuuu");
  }
};

/*
Vérification des gagnants
*/

const theWinnerIs = () => {
  if (
    morpion[0].join(" ") === "O O O" ||
    morpion[1].slice(-3).join(" ") === "O O O" ||
    morpion[2].slice(-3).join(" ") === "O O O" ||
    `${morpion[0][0]} ${morpion[1][3]} ${morpion[2][6]}` === "O O O" ||
    `${morpion[0][1]} ${morpion[1][4]} ${morpion[2][7]}` === "O O O" ||
    `${morpion[0][2]} ${morpion[1][5]} ${morpion[2][8]}` === "O O O" ||
    `${morpion[0][0]} ${morpion[1][4]} ${morpion[2][8]}` === "O O O" ||
    `${morpion[0][2]} ${morpion[1][4]} ${morpion[2][6]}` === "O O O"
  ) {
    messageErreur.style.display = "non";
    messageInfo.innerText = `${joueur} a gagné!!`;
    scoreOvalue++;
    console.log(scoreOvalue);
    localStorage.setItem("scoreO", scoreOvalue);
    joueurOscore.innerText = `Score: ${scoreOvalue}`;
    return;
  } else if (
    morpion[0].join(" ") === "X X X" ||
    morpion[1].slice(-3).join(" ") === "X X X" ||
    morpion[2].slice(-3).join(" ") === "X X X" ||
    `${morpion[0][0]} ${morpion[1][3]} ${morpion[2][6]}` === "X X X" ||
    `${morpion[0][1]} ${morpion[1][4]} ${morpion[2][7]}` === "X X X" ||
    `${morpion[0][2]} ${morpion[1][5]} ${morpion[2][8]}` === "X X X" ||
    `${morpion[0][0]} ${morpion[1][4]} ${morpion[2][8]}` === "X X X" ||
    `${morpion[0][2]} ${morpion[1][4]} ${morpion[2][6]}` === "X X X"
  ) {
    messageErreur.style.display = "non";
    messageInfo.innerText = `${joueur} a gagné!!`;
    scoreXvalue++;
    console.log(scoreXvalue);
    localStorage.setItem("scoreX", scoreXvalue);
    joueurXscore.innerText = `Score: ${scoreX}`;
    return;
  } else {
    return console.log("le jeu continue");
  }
};
theWinnerIs();

const choix = document.getElementsByClassName("case");
