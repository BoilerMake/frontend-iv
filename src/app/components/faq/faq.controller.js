'use strict';
angular.module('app')
.controller('FaqCtrl', function ($scope,$location,$localStorage,Auth,$window,$timeout, $state) {

  $scope.data = {
    questions: [
      {
        q: "What is a BoilerMake?",
        a: "BoilerMake is Purdue’s official 36 hour hackathon, a weekend for students across the country to come together and create, bringing ideas to life with technology."
      },
      {
        q: "Where is BoilerMake?",
        a: "BoilerMake will be held in the France A. Córdova Recreational Sports Center at Purdue University on January 20-22."
      },
      {
        q: "Who can attend BoilerMake?",
        a: "Anyone over 18 can come!"
      },
      {
        q: "Will travel costs be reimbursed?",
        a: "Travel reimbursement is free for all schools that receive a bus provided by BoilerMake."
      },
      {
        q: "What do we need to bring?",
        a: "Just your laptop, any additional specific hardware you think you’d need, valid ID, sleeping bag, and your passion to hack!"
      },
      {
        q: "Do you have to be a CS major?",
        a: "No! All majors are welcome."
      },
      {
        q: "Policy on Past projects?",
        a: "We believe in a new space experience for everyone. Please don’t hinder the experience for others by bringing old projects or code you’ve already begun to write."
      },
      {
        q: "Is experience required?",
        a: "No! We plan on accepting everyone of all hackathon experiences, beginners to veterans alike. We’re also planning on having an exciting team of mentor and mentorship opportunities to benefit from during the event."
      },
      {
        q: "Do we have to have a team?",
        a: "No, but you are welcome to bring a team if you’d like."
      },
      {
        q: "How will projects be judged?",
        a: "Judging will follow the HackMIT judging system."
      }
    ]
  };

});
