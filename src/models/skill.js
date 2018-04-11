(function(){
  'use strict';

  const expTable = [];

  class Skill extends LifeGamification.models.Model {
    constructor(name, exp, timerData){
      super();
      this.name = name;
      this.exp = exp;
      this.calcLevel();
      this.calcExpTillNextLevel();
      if(!timerData){
        timerData = {
          history: {},
          startTime: null,
        }
      }
      this.timer = new LifeGamification.models.Timer(timerData);
    }

    addExp(exp) {
      this.exp += exp;
      this.calcLevel();
      this.calcExpTillNextLevel();
    }

    calcLevel() {
      // TODO calc it in the better way.
      let level = 0;
      while(this.exp >= expTable[level + 1]){
        level++;
      }
      this.level = level;
    }

    calcExpTillNextLevel() {
      const levelExp = this.exp - expTable[this.level];
      const totalExpNeeded = expTable[this.level + 1] - expTable[this.level];
      this.expInThisLevel = levelExp;
      this.expTillNextLevel = totalExpNeeded;
    }
  }

  class SkillsCollection extends LifeGamification.models.Model {
    constructor (json) {
      super();
      this.data = {};
      this.loadData(json);
    }

    loadData (json) {
      if (json) {
        for (let skillName in json) {
          const skillData = json[skillName];
          this.data[skillName] = new Skill(
            skillName, skillData.exp, skillData.timer
          );
        }
      }
    }

    updateExp (skill, addedExp) {
      return new Promise((resolve, reject) => {
        if(!addedExp && addedExp !== 0) {
          console.log("Error: Added experience is NULL.");
          return reject(addedExp);
        }
        if(addedExp + skill.exp < 0){
          addedExp = -skill.exp;
        }
        skill.addExp(addedExp);
        this.save()
          .then(function (){
            return resolve(skill);
          });
      });
    }

    save () {
      return new Promise((resolve, reject) => {
        LifeGamification.repository.updateSkills(this.data).then(resolve);
      });
    }

    addSkill (skillName) {
      return new Promise((resolve, reject) => {
        if(!skillName){
          console.log("Error: Skill name is NULL or 0.");
          return reject();
        }
        if(skillName in this.data){
          console.log(`Error: skill ${skillName} already exits.`);
          return reject();
        }
        const newTimerData = {startTime: null, history: {}};
        const newSkill = new Skill(skillName, 0, newTimerData);
        this.data[skillName] = newSkill;
        this.save()
          .then(function() {
            resolve(newSkill);
          });
      });
    }

    removeSkill (skill) {
      return new Promise((resolve, reject) => {
        const skillName = skill.name;
        delete this.data[skillName];
        this.save()
          .then(resolve());
      });
    }
  };

  LifeGamification.skillsCollection = new SkillsCollection();

  LifeGamification.models.fillExpTable = function () {
    expTable[1] = 0;
    for (let i = 2; i < maxLevel; i++) {
      expTable[i] = expTable[i - 1] + (4 + (i - 1) * (Math.log10(i - 1) + 1));
    }
    for (let i = 2; i < maxLevel; i++) {
      expTable[i] = Math.floor(expTable[i]);
    }
  }

  // TODO delete it.
  LifeGamification.models.clearCollection = function () {
    for (let name in skillsCollection) {
      delete skillsCollection[name];
    }
  }
})();
