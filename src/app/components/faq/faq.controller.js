'use strict';
angular.module('app')
.controller('FaqCtrl', function ($scope,$location,$localStorage,Auth,$window,$timeout, $state) {

  $scope.data = {
    questions: [
      {
        q: "What is a BoilerMake?",
        a: "BoilerMake is Purdue’s official 36 hour hackathon, a weekend for students across the country to come together and create, bringing ideas to life with technology.",
        clipped: true
      },
      {
        q: "Who can attend BoilerMake?",
        a: "Anyone over 18 can come!",
        clipped: true
      },
      {
        q: "Will travel costs be reimbursed?",
        a: "Travel reimbursement is free for all schools that receive a bus provided by BoilerMake.",
        clipped: true
      },
      {
        q: "Will travel costs be reimbursed?",
        a: "Travel reimbursement is free for all schools that receive a bus provided by BoilerMake.",
        clipped: true
      },
      {
        q: "What do we need to bring?",
        a: "Just your laptop, any additional specific hardware you think you’d need, valid ID, sleeping bag, and your passion to hack!",
        clipped: true
      },
      {
        q: "Do you have to be a CS major?",
        a: "No! All majors are welcome.",
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
