"use strict"
const LifeGamification = {};
let skillsNames = [];
const maxLevel = 210;

document.addEventListener('DOMContentLoaded', function () {
  console.log(" ");
  console.log("Application begins.");

  LifeGamification.models.fillExpTable();
  LifeGamification.view.main.startView();
  LifeGamification.timer.handleTimerFinishButtons();
});
