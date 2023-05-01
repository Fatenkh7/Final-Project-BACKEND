import * as qna from '@tensorflow-models/qna';
import axios from 'axios';

const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/w/api.php';

const getArticleTitle = async (searchTerm) => {
  const searchUrl = `${WIKIPEDIA_API_URL}?action=opensearch&search=${encodeURIComponent(searchTerm)}&limit=1&namespace=0&format=json`;
  const response = await axios.get(searchUrl);
  return response.data[1][0];
};

const getSectionText = async (articleTitle, section) => {
  const url = `${WIKIPEDIA_API_URL}?action=parse&section=${encodeURIComponent(section)}&page=${encodeURIComponent(articleTitle)}&format=json`;
  const response = await axios.get(url);
  return response.data.parse.text["*"];
};

const getHighestRankedAnswer = async (question, answers) => {
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
  const articleTitle = await getArticleTitle(searchTerm);
  const sections = await getSections(articleTitle);
  const answers = await Promise.all(sections.map(async section => await getSectionText(articleTitle, section)));
  const highestRankedAnswer = await getHighestRankedAnswer(searchTerm, answers);
  console.log(highestRankedAnswer);
};

main();

// import * as tf from '@tensorflow/tfjs-node';
// import * as qna from '@tensorflow-models/qna';

// const QUESTION = process.argv[2]; // Input question as argument
// const CONTEXT = process.argv[3]; // Input context as argument

// const getAnswer = async () => {
//   const model = await qna.load();
//   const result = await model.findAnswers(QUESTION, CONTEXT);
//   return result[0].text;
// };

// const main = async () => {
//   const answer = await getAnswer();
//   console.log(answer);
// };

// main();