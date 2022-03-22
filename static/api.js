const express = require("express");
const Posts = require("../schemas/posts")
const List = require("../schemas/list")
const router = express.Router();


function getposts(title, callback) {
  $("#postsList").empty();
  console.log('getposts=',workding )
  $.ajax({
    type: "GET",
    url: `/api/posts${title ? "?title=" + title : ""}`,
    // headers: {
    //   authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
    success: function (response) {
      callback(response["posts"]);
      console.log('api.js=', ["posts"])
    },
  });
}
