import _ from "underscore";
import { createDeck as createNewDeck, getCard, valueCard } from "./usecases";

let deck = [];

const specials = ["A", "J", "Q", "K"];
const types = ["C", "D", "H", "S"];

let playersPoints = [];
let scorePlayer;
let scoreComputer;
let cleanRequired = true;
//referencias HTML

const btnGetting = document.querySelector("#btnPedir");
const btnHold = document.querySelector("#btnPlantarse");
const btNewGame = document.querySelector("#btnNuevo");
const smallScores = document.querySelectorAll("small");
const divCardPlayers = document.querySelectorAll(".divCartas");

const defaultCards = () => {
  const imgCard = document.createElement("img");
  const imgCardRed = document.createElement("img");
  imgCard.src = `assets/cards/red_back.png`;
  imgCard.classList.add("carta");
  imgCardRed.src = `assets/cards/grey_back.png`;
  imgCardRed.classList.add("carta");
  divCardPlayers[1].append(imgCardRed);
  divCardPlayers[0].append(imgCard);
};

const gameInit = (numPlayers = 2) => {
  deck = createNewDeck(types, specials, deck);
  playersPoints = [];
  for (let i = 0; i < numPlayers; i++) {
    playersPoints.push(0);
  }

  smallScores.forEach((element) => {
    element.innerHTML = 0;
  });

  divCardPlayers.forEach((element) => {
    element.innerHTML = "";
  });

  btnGetting.disabled = false;
  btnHold.disabled = false;

  defaultCards();
  scorePlayer = 0;
  scoreComputer = 0;
  cleanRequired = true;
};

//Turno de la computadora
const accumulatePoints = (card, player) => {
  playersPoints[player] += valueCard(card);
  smallScores[player].innerHTML = playersPoints[player];
  return playersPoints[player];
};

const createCard = (carta, player) => {
  const imgCard = document.createElement("img");
  imgCard.src = `assets/cards/${carta}.png`;
  imgCard.classList.add("carta");
  divCardPlayers[player].append(imgCard);
};

const viewWinner = ([scoreMin, scoreComputer]) => {
  setTimeout(() => {
    if (scoreMin > 21) {
      alert("Lo lamento, la casa gana");
    } else if (scoreComputer === scoreMin) {
      alert("Empatados");
    } else if (scoreComputer > scoreMin && scoreComputer <= 21) {
      alert("La casa gana");
    } else {
      alert("Felicidades has ganado");
    }
  }, 300);
};
const computerTurn = (scoreMin) => {
  divCardPlayers[1].innerHTML = "";
  do {
    const carta = getCard(deck);
    scoreComputer = accumulatePoints(carta, playersPoints.length - 1);
    createCard(carta, playersPoints.length - 1);
  } while (scoreMin > scoreComputer && scoreMin <= 21);
  viewWinner(playersPoints);
};

const finishGame = () => {
  if (scorePlayer > 21) {
    btnGetting.disabled = true;
    btnHold.disabled = true;
    computerTurn(scorePlayer);
  } else if (scorePlayer === 21) {
    btnGetting.disabled = true;
    btnHold.disabled = true;
    computerTurn(scorePlayer);
  }
};

//eventos
btnGetting.addEventListener("click", () => {
  if (cleanRequired) {
    divCardPlayers[0].innerHTML = "";
    cleanRequired = false;
  }
  const carta = getCard(deck);
  scorePlayer = accumulatePoints(carta, 0);
  createCard(carta, 0);

  finishGame();
});

btnHold.addEventListener("click", () => {
  btnGetting.disabled = true;
  btnHold.disabled = true;
  computerTurn(scorePlayer);
});

btNewGame.addEventListener("click", () => {
  gameInit();
});
