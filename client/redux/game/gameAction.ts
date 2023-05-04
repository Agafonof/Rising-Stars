import { PlayerType } from '../../types/userTypes';

export const loadPhotoAction = (payload) => ({
  type: 'LOAD_PHOTO',
  payload,
});

export const startGameAction = (payload) => ({
  type: 'START_GAME',
  payload,
});

export const voteAction = (payload : PlayerType) => ({
  type: 'VOTE',
  payload,
});

export const newRoundAction = (payload) => ({
  type: 'NEW_ROUND',
  payload,
});

export const getQuestionsAction = ()=> ({
  type: 'GET_QUESTIONS',
}
)