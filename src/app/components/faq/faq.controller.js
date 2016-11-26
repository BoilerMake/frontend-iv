'use strict';
angular.module('app')
.controller('FaqCtrl', function ($scope,$location,$localStorage,Auth,$window,$timeout, $state) {

  $scope.data = {
    questions: [
      {
        q: "What is a BoilerMake?",
        a: "BoilerMake is Purdue’s official 36 hour hackathon, a weekend for students across the country to come together and collaboratively create, bringing ideas to life with technology.",
        clipped: true
      },
      {
        q: "Where is BoilerMake?",
        a: "BoilerMake will be held in the France A. Córdova Recreational Sports Center at Purdue University on January 20-22, 2017.",
        clipped: true
      },
      {
        q: "Who can attend BoilerMake?",
        a: "Anyone over 18 can come! We encourage everyone with a passion for building cool things to embark on this space mission with us.",
        clipped: true
      },
      {
        q: "How do I get there?",
        a: "If an area or school has enough applicants, we will send a bus there and assign a bus coordinator for that area. There are some specific cases where we will provide travel reimbursement. If you are very eager to come and didn’t get accepted and want to drive yourself be sure to let us know at team@boilermake.org.",
        clipped: true
      },
      {
        q: "What do we need to bring?",
        a: "Just your laptop, any additional specific hardware you think you’d need, valid ID, sleeping bag, and your passion to hack! Anything and everything else you could need will be provided to you, such as food, toiletries, and cool swag.",
        clipped: true
      },
      {
        q: "Do you have to be a CS major?",
        a: "No! All majors are welcome, whether you're passionate about hardware, design, business, or just have cool idea.",
        clipped: true
      },
      {
        q: "Policy on past projects?",
        a: "We believe in letting everyone start on equal footing. Please don’t hinder the experience for others by bringing old projects or code you’ve already begun to write.",
        clipped: true
      },
      {
        q: "Is extensive coding experience required?",
        a: "No, we plan on accepting everyone of all hackathon experiences, beginners to veterans alike. We’re also planning on having an exciting team of mentor and mentorship opportunities to benefit from during the event.",
        clipped: true
      },
      {
        q: "Do we have to have a team?",
        a: "No, but you are welcome to form teams before or during the event.",
        clipped: true
      },
      {
        q: "How will projects be judged?",
        a: "The top hacks are selected based on: creativity, technical difficulty, design, and utility.",
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
