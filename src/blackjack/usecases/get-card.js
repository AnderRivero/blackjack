/**
 * retorna la última carta del mazo
 * @param {Array<string>} deck
 * @returns 
 */
export const getCard = (deck) => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  return deck.pop();
};
