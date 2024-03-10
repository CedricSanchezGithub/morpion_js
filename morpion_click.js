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
let valeurSubmit;
const messageErreur = document.getElementById("erreur");
const messageInfo = document.getElementById("info");
const joueurInfo = document.getElementById("joueur");
const choix = document.querySelector(".morpion");
const scoreOdom = document.getElementById("scoreO");
const scoreXdom = document.getElementById("scoreX");
const rejouer = document.getElementById("rejouer");
const reset = document.getElementById("reset");

let morpion = [
  ["-", "-", "-"],
  ["-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

let joueur = "O";
let lignsuperieureGagnante = ["O", "O", "O"];
let lignsuperieure = [...morpion[0]];
let scoreXvalue = localStorage.getItem("scoreX");
let scoreOvalue = localStorage.getItem("scoreO");
scoreOdom.innerText = localStorage.getItem("scoreO");
scoreXdom.innerText = localStorage.getItem("scoreX");

function evenementClick(e) {
  let valeurInput = e.target.childNodes[0].textContent;
  let valeurInputNumber = Number(valeurInput);
  if (valeurInputNumber < 3) {
    // Changement de l'index du tableau indiqué par l'utilisateur via valeurInputNumber par la variable joueur
    morpion[0][valeurInputNumber] = joueur;
    decrementArray(tableau, valeurInput);
    logMorpion();
    // theWinnerIs();
    colorChangeCase(valeurInputNumber);
    checkIfGameOver(valeurInput);
    if (theWinnerIs()) {
      messageInfo.style.display = "none";
      choix.removeEventListener("click", evenementClick);
      return;
    }
    joueurSwitch();
  } else if (valeurInputNumber < 6) {
    morpion[1][valeurInputNumber] = joueur;
    decrementArray(tableau, valeurInput);
    logMorpion();
    // theWinnerIs();
    checkIfGameOver(valeurInput);
    colorChangeCase(valeurInputNumber);
    if (theWinnerIs()) {
      messageInfo.style.display = "none";
      choix.removeEventListener("click", evenementClick);
      return;
    }
    joueurSwitch();
  } else if (valeurInputNumber < 9) {
    morpion[2][valeurInputNumber] = joueur;
    decrementArray(tableau, valeurInput);
    logMorpion();
    // theWinnerIs();
    checkIfGameOver(valeurInput);
    colorChangeCase(valeurInputNumber);
    if (theWinnerIs()) {
      messageInfo.style.display = "none";
      choix.removeEventListener("click", evenementClick);
      return;
    }
    joueurSwitch();
  }
}
choix.addEventListener("click", evenementClick);

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

// let index = tableauBis.indexOf("valeurInput");
// if (index !== -1) {
//   tableauBis.splice(index, 1);
// }

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
    joueurInfo.innerText = "Jeu terminé! Égalité";
    messageErreur.style.display = "none";
    rejouer.style.display = "inline";
    rejouer.addEventListener("click", () => {
      location.reload();
    });
    return console.log(`jeu terminé!`);
  }
};

/*
Change la couleur des cases du morpion selon le joueur
*/

const colorChangeCase = (valeurInputNumber) => {
  let cases = document.getElementsByClassName("case");
  if (joueur === "O") {
    cases[valeurInputNumber].style.background = "rgb(84, 84, 231)";
    cases[valeurInputNumber].style.color = "black";
    cases[valeurInputNumber].innerText = "O";
  } else if (joueur === "X") {
    cases[valeurInputNumber].style.background = "rgb(231, 138, 84)";
    cases[valeurInputNumber].style.color = "black";
    cases[valeurInputNumber].innerText = "X";
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
    confettis();
    joueurInfo.innerText = `${joueur} a gagné!!`;
    // Incrémentation du score
    scoreOvalue++;
    console.log(`Score O: ${scoreOvalue}`);
    localStorage.setItem("scoreO", `${scoreOvalue}`);
    console.log(localStorage.getItem("scoreO"));
    scoreOdom.innerText = localStorage.getItem("scoreO");
    // Ajout du boutton rejouer
    rejouer.style.display = "inline";
    rejouer.addEventListener("click", () => {
      location.reload();
    });
    reset.style.display = "inline";
    reset.addEventListener("click", () => {
      localStorage.removeItem("scoreO");
      localStorage.removeItem("scoreX");
      scoreXdom.innerText = localStorage.getItem("scoreX");
      scoreOdom.innerText = localStorage.getItem("scoreO");
    });
    return true;
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
    confettis();
    joueurInfo.innerText = `${joueur} a gagné!!`;
    // Incrémentation du score
    scoreXvalue++;
    console.log(`Score X: ${scoreXvalue}`);
    localStorage.setItem("scoreX", `${scoreXvalue}`);
    console.log(localStorage.getItem("scoreX"));
    scoreXdom.innerText = localStorage.getItem("scoreX");
    // Ajout du boutton rejouer et reset
    rejouer.style.display = "inline";
    reset.style.display = "inline";
    reset.addEventListener("click", () => {
      localStorage.removeItem("scoreO");
      localStorage.removeItem("scoreX");
      scoreXdom.innerText = localStorage.getItem("scoreX");
      scoreOdom.innerText = localStorage.getItem("scoreO");
    });
    rejouer.addEventListener("click", () => {
      location.reload();
    });
    return true;
  } else {
    return false;
  }
};

// Confetis via l'api "canvas-confetti"

const confettis = function () {
  var duration = 7 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};
