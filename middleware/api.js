import axios from "axios";

export async function fetchStackQuestions() {
  try {
    const response = await axios.get(
      "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow"
    );
    console.log("stack", response.data);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchWikQuestions() {
  try {
    const response = await axios.get.get(
      "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=SEARCH_TERM&exintro&explaintext"
    );
    console.log("wiki", response.data);
  } catch (error) {
    console.log(error);
  }
}


// import axios from 'axios';

// const searchTerm = 'EXAMPLE';
// const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${searchTerm}&exintro&explaintext`;

// try {
//   const response = await axios.get(url);
//   const pageId = Object.keys(response.data.query.pages)[0];
//   const title = response.data.query.pages[pageId].title;
//   const extract = response.data.query.pages[pageId].extract;

//   console.log(`Title: ${title}`);
//   console.log(`Extract: ${extract}`);
// } catch (error) {
//   console.log(error);
// }
