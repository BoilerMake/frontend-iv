'use strict';
angular.module('app')
.controller('FaqCtrl', function ($scope,$location,$localStorage,Auth,$window,$timeout, $state) {

  $scope.data = {
    questions: [
      {
        q: "What is a good question to ask?",
        a: "Here lies an answer for the question that was asked immediately before here. Let's see what happens, get ready to have fun!",
        clipped: true
      },
      {
        q: "What is a good question to ask?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        clipped: true
      },
      {
        q: "What is a good question to ask?",
        a: "Here lies an answer for the question that was asked immediately before here. Let's see what happens, get ready to have fun!",
        clipped: true
      },
      {
        q: "What is a good question to ask?",
        a: "Here lies an answer for the question that was asked immediately before here. Let's see what happens, get ready to have fun!",
        clipped: true
      },
      {
        q: "What is a good question to ask?",
        a: "Here lies an answer for the question that was asked immediately before here. Let's see what happens, get ready to have fun!",
        clipped: true
      },
      {
        q: "What is a good question to ask?",
        a: "Here lies an answer for the question that was asked immediately before here. Let's see what happens, get ready to have fun!",
        clipped: true
      }
    ]  
  };

  $scope.getAnswer = function(question) {
    if (!question.clipped) return question.a;
    var clippedText = question.a.substring(0, 54);
    var spaceIndex = clippedText.lastIndexOf(" ");
    return clippedText.substring(0, spaceIndex) + "...";
  };

  $scope.getLinkText = function(question) {
    if (question.clipped) return "Show More";
    return "Show Less"
  };

  $scope.submitQuestion = function() {
    var baseUrl = "mailto:help@boilermake.org?subject=Question about BoilerMake&body=";
    var messageText = document.getElementById("questionInput").value;
    window.location.href = baseUrl + messageText;
  };

});
