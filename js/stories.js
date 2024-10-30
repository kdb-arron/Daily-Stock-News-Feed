"use strict";

const $allStoriesList = $("#all-stories-list");
const $backButton = $("#back-button");
let storyList;

/** Render individual story markup */
function generateStoryMarkup(story) {
  const hostName = story.getHostName();
  const isFavorite = favorites.some(fav => fav.newsUrl === story.newsUrl);
  const starType = isFavorite ? "fas" : "far";  // "fas" for filled star, "far" for outline

  return $(`
    <li id="${story.newsUrl}">
      <span class="favorite">
        <i class="${starType} fa-star"></i>
      </span>
      <a href="${story.newsUrl}" target="_blank">${story.title}</a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author" style="color: green;">${story.sourceName}</small>
      <small class="story-date">${story.date.toDateString()}</small>
      <p>${story.text}</p>
      <hr class="story-divider">
    </li>
  `);
}

/** Display the list of stories on the page */
function putStoriesOnPage() {
  $allStoriesList.empty();

  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $(".stories-container").removeClass("hidden");
  $backButton.removeClass("hidden"); // Show "Back" button on search results page
}

/** Handle search submission and fetch stories */
async function submitStockSearch(evt) {
  evt.preventDefault();
  const ticker = $("#stock-ticker").val().toUpperCase();

  storyList = await StoryList.getStories(ticker);
  putStoriesOnPage();

  $("#landing").hide();
}

/** Handle "Back" button click to return to the landing page */
function goBack() {
  $(".stories-container").addClass("hidden");
  $backButton.addClass("hidden"); // Hide "Back" button
  $("#landing").show();
}

/** Toggle favorite/unfavorite status on star icon click */
const favorites = [];

function toggleFavorite(evt) {
  const $target = $(evt.target);
  const storyId = $target.closest("li").attr("id");
  const story = storyList.stories.find(s => s.newsUrl === storyId);

  const isFavorite = favorites.some(fav => fav.newsUrl === story.newsUrl);
  if (isFavorite) {
    favorites.splice(favorites.findIndex(fav => fav.newsUrl === story.newsUrl), 1);
    $target.removeClass("fas").addClass("far");  // Outline star
  } else {
    favorites.push(story);
    $target.removeClass("far").addClass("fas");  // Filled star
  }
}

$allStoriesList.on("click", ".fa-star", toggleFavorite);
