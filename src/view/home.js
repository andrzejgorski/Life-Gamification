(function(){
  LifeGamification.view.home = {};
  LifeGamification.view.home.name = "Home";

  let skillsView = [];

  const welcome_message = `
    <p>Welcome to Life Gamification!<br>
    To add your first skill go to Edit skills.</p>`;

  class HomeView extends Abstract.View {
    constructor() {
      super();

    }

    _addLevel(father, skill) {
      const levelNumber = doc.createElement('a');
      levelNumber.setAttribute("class", "skill__level-number");
      levelNumber.innerHTML = skill.level;
      father.appendChild(levelNumber);

      const levelText = doc.createElement('a');
      levelText.setAttribute("class", "skill__level-text");
      levelText.innerHTML = "lvl";
      father.appendChild(levelText);
    }

    _addName(father, skill) {
      const name = doc.createElement('a');
      name.setAttribute("class", "skill__name");
      name.innerHTML = skill.name;
      father.appendChild(name);
    }

    _addProgressBar(father, skill) {
      const barWrapper = doc.createElement('div');
      barWrapper.setAttribute("class", "progress-bar__wrapper");
      father.appendChild(barWrapper);

      let percent = Math.floor(
        100 * skill.expInThisLevel / skill.expTillNextLevel);

      const container = doc.createElement('span');
      container.setAttribute("class", "progress-bar__container");
      barWrapper.appendChild(container);

      const pg_container = doc.createElement('span');
      pg_container.setAttribute("class", "progress-bar__container-fill");
      pg_container.innerHTML = `${percent}%`;
      pg_container.setAttribute("style", `width: ${percent}%`);
      container.appendChild(pg_container);

      const pg_buttons = doc.createElement('div');
      pg_buttons.setAttribute("class", "progress-bar__buttons");
      barWrapper.appendChild(pg_buttons);

      const input = doc.createElement('input');
      input.setAttribute("class", "progress-bar__add-input");
      input.setAttribute("type", "number");
      input.setAttribute("value", "1");
      pg_buttons.appendChild(input);

      const addButton = doc.createElement('span');
      addButton.setAttribute("class", "progress-bar__add-button");
      addButton.innerHTML = "+";
      pg_buttons.appendChild(addButton);
    }

    _addExp(father, skill) {
      const exp = doc.createElement('a');
      exp.setAttribute("class", "skill_experience");
      exp.innerHTML = `${skill.expInThisLevel}/${skill.expTillNextLevel}`;
      father.appendChild(exp);
    }

    renderskill(father, skill) {
      const skillDiv = doc.createElement('div');
      skillDiv.setAttribute("class", "skill");
      this._addLevel(skillDiv, skill);
      this._addName(skillDiv, skill);
      this._addProgressBar(skillDiv, skill);
      this._addExp(skillDiv, skill);
      father.appendChild(skillDiv);
    }

    render () {
      skillsView = LifeGamification.skillsCollection.data;
      this.allSkills = doc.createElement('div');
      this.allSkills.setAttribute("id", "all-skills");
      this.rootEl.appendChild(this.allSkills);
      for (let key in skillsView) {
        this.renderskill(this.allSkills, skillsView[key]);
      }
    }
  }

  //Functions to both Home and Edit views.

  LifeGamification.view.home.viewLevelAndExp = function (skillsCollection, skill) {
    const number = skillsCollection.findIndex(function (element) {
      return element === skill;
    });
    $(`.level${number}`).html(`${skill.level}`);
    $(`.name${number}`).html(`${skill.name}`);
    $(`.exp${number}`).html(`
      ${skill.expInThisLevel}/${skill.expTillNextLevel}`);

    let percent = Math.floor(
      100 * skill.expInThisLevel / skill.expTillNextLevel);
    $(`.fill${number}`).html(`${percent}%`);
    $(`.fill${number}`).css('width', `${percent}%`);
  }

  LifeGamification.view.home.skillHTML = function (number) {
    return (`
      <a class="skill__level-number level${number}">-1</a>
      <a class="skill__level-text">lvl</a>
      <a class="skill__name name${number}">Skillname</a>
      <div class="progress-bar__wrapper">
          <span class="progress-bar__container">
              <span class="progress-bar__container-fill fill${number}">-1%</span>
          </span>
          <div class="progress-bar__buttons">
              <input class="progress-bar__add-input" id="addVal${number}" type="number" value="1">
              <span class="progress-bar__add-button" id="add${number}"> +</span>
          </div>
        </div>
        <a class="skill__experience exp${number}">-1/-1</a>
    </div>
    `);
  }

  LifeGamification.view.home.handleSkillButtons = function () {
    const update_exp = function (skillNr) {
      const addedExp = parseInt($("#addVal" + skillNr).val());
      $("#addVal" + skillNr).val('1');
      const skill = skillsView[skillNr];
      LifeGamification.skillsCollection.updateExp(skill, addedExp)
        .then((skill) => {
          LifeGamification.view.home.viewLevelAndExp(skillsView, skill);
        });
    }
    $("#all-skills").on("click", ".progress-bar__add-button", function () {
      const skillNr = this.id.replace('add', '');
      update_exp(skillNr);
    });
    $("#all-skills").on("keyup", ".progress-bar__add-input", function (event) {
      if (event.keyCode === 13) {
        const skillNr = this.id.replace('addVal', '');
        update_exp(skillNr);
      }
    });
  }

  //End of functions to both Home and Edit views.

  const skillHomeHTML = function (number) {
    return (`<div class="skill">`) + LifeGamification.view.home.skillHTML(number);
  }

  const appendHomeSkill = function (skill) {
    $('#all-skills').append(skillHomeHTML(skillsView.length));
    skillsView.push(skill);
    LifeGamification.view.home.viewLevelAndExp(skillsView, skill);
  }

  const render = function (skills) {
    let skillsEmpty = true;

    $('#content').append(`<div id="all-skills"> </div>`)
    for (let name in skills) {
      skillsEmpty = false;
      appendHomeSkill(skills[name]);
    }

    if (skillsEmpty) {
      $('#content').append(`<div id="welcome-message"> ${welcome_message}</div>`)
    }
    LifeGamification.view.home.handleSkillButtons();
  }

  LifeGamification.view.home.render = function () {
    skillsView = [];
    render(LifeGamification.skillsCollection.data);
  }

  LifeGamification.view.home = new HomeView();
})();
