"use strict"
const LifeGamification = {};
let skillsNames = [];
const maxLevel = 210;

document.addEventListener('DOMContentLoaded', function () {
  console.log("Application begins.");

  LifeGamification.models.fillExpTable();
  LifeGamification.view.main.startView();
});
