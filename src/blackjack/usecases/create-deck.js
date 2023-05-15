import _ from "underscore";

/**
 * Esta función crea un nuevo deck
 * @param {Array<string>} typeOfCards Ejemplo: ["C", "D", "H", "S"]
 * @param {Array<string>} specialCards Ejemplo: ["A", "J", "Q", "K"]
 * @param {Array<string>} deck
 * @returns {Array<string>} retorna un nuevo deck de carta
 */
export const createDeck = (typeOfCards, specialCards, deck) => {
  if (!typeOfCards || typeOfCards.length === 0)
    throw new Error("typeOfCards is obligatoty");

  if (!specialCards || specialCards.length === 0)
    throw new Error("specialCards is obligatoty");

  deck = [];
  for (let i = 2; i <= 10; i++) {
    for (const type of typeOfCards) {
      deck.push(`${i}${type}`);
    }
  }

  for (const type of typeOfCards) {
    for (const special of specialCards) {
      deck.push(`${special}${type}`);
    }
  }

  return _.shuffle(deck);
};