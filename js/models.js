"use strict";

const BASE_URL = "https://stocknewsapi.com/api/v1";
const API_KEY = "q6htdmhna1xle0adakarule1m5lyucfiabl6vzde";

class Story {
  constructor({
    news_url,
    image_url,
    title,
    text,
    source_name,
    date,
    topics,
    sentiment,
    type,
    tickers
  }) {
    this.newsUrl = news_url;
    this.imageUrl = image_url;
    this.title = title;
    this.text = text;
    this.sourceName = source_name;
    this.date = new Date(date);
    this.topics = topics;
    this.sentiment = sentiment;
    this.type = type;
    this.tickers = tickers;
  }

  getHostName() {
    return new URL(this.newsUrl).hostname;
  }
}

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  /** Fetch stories from the API based on stock ticker symbol */
  static async getStories(ticker) {
    const response = await axios.get(`${BASE_URL}?tickers=${ticker}&items=3&page=1&token=${API_KEY}`);
    const stories = response.data.data.map(storyData => new Story(storyData));
    return new StoryList(stories);
  }
}
