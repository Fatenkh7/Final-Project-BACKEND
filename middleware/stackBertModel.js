import * as qna from '@tensorflow-models/qna';
import axios from 'axios';

const STACKOVERFLOW_API_URL = 'https://api.stackexchange.com/2.3';

const getQuestionIds = async (searchTerm) => {
  const searchUrl = `${STACKOVERFLOW_API_URL}/search?order=desc&sort=votes&intitle=${encodeURIComponent(searchTerm)}&site=stackoverflow`;
  const response = await axios.get(searchUrl);
  return response.data.items.map(item => item.question_id);
};

const getAnswers = async (questionId) => {
  const url = `${STACKOVERFLOW_API_URL}/questions/${questionId}/answers?order=desc&sort=votes&site=stackoverflow&filter=withbody`;
  const response = await axios.get(url);
  return response.data.items.map(item => item.body);
};

const getHighestScoredAnswer = async (question, answers) => {
  const model = await qna.load();
  const scores = await Promise.all(answers.map(async answer => {
    const result = await model.findAnswers(question, answer);
    return result[0].score;
  }));
  const highestScoreIndex = scores.indexOf(Math.max(...scores));
  return answers[highestScoreIndex];
};

const main = async () => {
  const searchTerm = prompt('Enter your search query:');
  const questionIds = await getQuestionIds(searchTerm);
  const answers = await Promise.all(questionIds.map(async id => await getAnswers(id)));
  const flattenedAnswers = answers.flat();
  const highestScoredAnswer = await getHighestScoredAnswer(searchTerm, flattenedAnswers);
  console.log(highestScoredAnswer);
};

main();
