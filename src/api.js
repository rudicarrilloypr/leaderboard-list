const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

export const createGame = async (name) => {
  const response = await fetch(`${baseUrl}/games/`, {
    method: 'POST',
    body: JSON.stringify({
      name,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const jsonResponse = await response.json();

  return jsonResponse;
};

export const getScores = async (gameId) => {
  const response = await fetch(`${baseUrl}/games/${gameId}/scores/`);

  const jsonResponse = await response.json();

  return jsonResponse.result;
};

export const postScore = async (gameId, playerName, score) => {
  const response = await fetch(`${baseUrl}/games/${gameId}/scores/`, {
    method: 'POST',
    body: JSON.stringify({
      user: playerName,
      score,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response.ok;
};
