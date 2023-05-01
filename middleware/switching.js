import stackbert from "./stackBertModel.js";
import wikibert from "./WikiBertModel.js";

const search = async (question) => {
    let bestAnswer;
    switch (true) {
      case question.includes('stackoverflow'):
        bestAnswer = await stackbert(question);
        break;
      default:
        bestAnswer = await stackbert(question);
        if (!bestAnswer) {
          bestAnswer = await wikibert(question);
        }
        break;
    }
    return bestAnswer;
  };