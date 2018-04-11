(function(){
  'use strict';

  const minute = 60000;
  class Timer extends LifeGamification.models.Model {
    constructor(timerData) {
      super();
      this.history = timerData.history;
      this.startTime = timerData.startTime;
    }

    startWork(taskType) {
      if(this.startTime === null){
        this.startTime = new Date().getTime();
        this.history[this.startTime] = {
          type: taskType,
          finishTime: null
        };
      } else{
        console.warn(`You are trying to
          start new work without finishing previous one.`);
      }
    }

    finishWork() {
      if(this.startTime !== null){
        const finishTime = new Date().getTime();
        this.history[this.startTime].finishTime = finishTime;
        const timeWorked = finishTime - this.startTime;
        this.startTime = null;
        return timeWorked;
      } else {
        console.warn(`You are trying to finish work without starting one.`);
      }
    }

    findNumberOfSessions(minTime, maxTime){
      //We have to change it to handle pomodoros as well
      let sessionsNum = 0;
      for (let startTime in this.history){
        const finishTime = this.history[startTime].finishTime;
        const totalTime = (finishTime - startTime) / minute;
        if(minTime <= totalTime && totalTime <= maxTime){
          sessionsNum++;
        }
      }
      return sessionsNum;
    }

    getWorkInfo() {
      if (!this.startTime)
        return null;
      const type = this.history[this.startTime].type;
      const timeLapsed = LifeGamification.utils.calcTime(this.startTime);
      if(type.name === "normal"){
        return {"type": type, "time": timeLapsed};
      }
      if(type.name === "countdown"){
        const time = type.info.countdown * minute - timeLapsed;
        return {"type": type, "time": time};
      }
      if(type.name === "pomodoro"){
        let pomodorosFinished = 0;
        let currentlyWorking = true;
        let sinceBigBreak = 0;
        let nextTaskTime = 0;
        let finished = false;

        //Iterating by each pomodoro and break
        while(nextTaskTime <= timeLapsed){
          if(currentlyWorking){ //pomodoro time
            nextTaskTime += type.info.length * minute;
            currentlyWorking ^= 1;
            if(nextTaskTime <= timeLapsed){
              pomodorosFinished++;
            }
          } else { // break time
            if(sinceBigBreak === type.info.between - 1){ // big break
              nextTaskTime += type.info.bigbr * minute;
              sinceBigBreak = 0;
            } else { //short break
              nextTaskTime += type.info.br * minute;
              sinceBigBreak++;
            }
            currentlyWorking ^= 1;
          }
          if(pomodorosFinished == type.info.number){
            finished = true;
          }
        }
        currentlyWorking ^= 1; /*Because it changes on entering a
         pomodoro or break time, not on leaving and we need current state */
        const time = nextTaskTime - timeLapsed;
        return {
          "type": type,
          "time": time,
          "currentlyWorking": currentlyWorking,
          "finished": finished
        };
      }
      return type;
    }
  }
  LifeGamification.models.Timer = Timer;

  LifeGamification.models.startWork = function (skill, type) {
    return new Promise((resolve, reject) => {
      skill.timer.startWork(type);
      LifeGamification.skillsCollection.save()
        .then(resolve);
    });
  }

  LifeGamification.models.finishWork = function (skill) {
    return new Promise((resolve, reject) => {
      const addedExp = Math.floor(skill.timer.finishWork() / 60000);
      LifeGamification.skillsCollection.updateExp(skill, addedExp)
        .then(function(){
          resolve(addedExp);
        });
    });
  }
})();
