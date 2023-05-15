/**
 * Extrae el valor número de la carta suministrada
 * @param {String} card
 * @returns {Number}
 */
export const valueCard = (card = "") => {
  if (card === "")
    throw new Error("Error al recibir la información de la carta");
  let value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : Number(value);
};
