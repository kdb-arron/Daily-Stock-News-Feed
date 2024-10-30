"use strict";

function navSearchClick(evt) {
  hidePageComponents();
  $("#search-form").show();
}

function navFavoritesClick(evt) {
  hidePageComponents();
  putFavoritesOnPage();
}

$body.on("click", "#nav-search", navSearchClick);
$body.on("click", "#nav-favorites", navFavoritesClick);
