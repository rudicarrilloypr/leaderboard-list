import './style.css';
import { createGame, getScores, postScore } from './api.js';

const refreshScores = async (gameId) => {
  const scores = await getScores(gameId);
  const scoreTable = document.querySelector('#scoreTable');
  // clear existing scores
  while (scoreTable.childElementCount > 1) {
    scoreTable.lastChild.remove();
  }
  scores.forEach((score) => {
    const scoreRow = document.createElement('tr');
    scoreRow.innerHTML = `<td>${score.user}</td><td>${score.score}</td>`;
    scoreTable.appendChild(scoreRow);
  });
};

const submitScore = async (gameId) => {
  const nameInput = document.querySelector('#nameInput');
  const scoreInput = document.querySelector('#scoreInput');
  const success = await postScore(gameId, nameInput.value, Number(scoreInput.value));
  if (success) {
    // clear inputs
    nameInput.value = '';
    scoreInput.value = '';
  }
  refreshScores(gameId);
};

document.addEventListener('DOMContentLoaded', async () => {
  const newGame = await createGame('My Cool Game');
  const [, , , gameId] = newGame.result.split(' ');
  const refreshButton = document.querySelector('.btn');
  const submitButton = document.querySelector('#submitButton');
  refreshButton.addEventListener('click', () => refreshScores(gameId));
  submitButton.addEventListener('click', () => submitScore(gameId));
});
