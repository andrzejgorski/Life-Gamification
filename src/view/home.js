(function(){
  const welcome_message = `
    <p>Welcome to Life Gamification!<br>
    To add your first skill go to Edit skills.</p>`;

  LifeGamification.view.HomeView = class HomeView extends Abstract.View {
    constructor() {
      super(LifeGamification.skillsCollection, null);
      this.name = 'Home';
    }

    _addSkillExp(skill, input) {
      const addedExp = parseInt(input["value"]);
      input.setAttribute("value", "1");
      skill.addExp(addedExp);
    }

    _addProgressBar(father, skill) {
      const barWrapper = this._createElement(
        'div', {"class": "progress-bar__wrapper"}, '', father);
      const container = this._createElement(
        'span', {"class": "progress-bar__container"}, '', barWrapper);
      let percent = Math.floor(
        100 * skill.expInThisLevel / skill.expTillNextLevel);

      this._createElement(
        'span', {
          "class": "progress-bar__container-fill",
          "style": `width: ${percent}%`
        },
        `${percent}%`, container
      );

      const pg_buttons = this._createElement(
        'div', {"class": "progress-bar__buttons"}, '', barWrapper);
      const input = this._createElement('input', {
          "class": "progress-bar__add-input",
          "type": "number",
          "value": "1"
        }, '', pg_buttons
      );
      input.onkeyup = (event) => {
        if (event.keyCode === 13) {
          this._addSkillExp(skill, input);
        }
      };

      const addButton = this._createElement(
        'span', {"class": "progress-bar__add-button"}, "+", pg_buttons);
      addButton.onclick = () => {
        this._addSkillExp(skill, input);
      }
    }

    renderskill(father, skill) {
      const skillDiv = this._createElement(
        'div', {"class": "skill"}, '', father);
      this._createElement(
        'a', {"class": "skill__level-number"}, skill.level, skillDiv);
      this._createElement(
        'a', {"class": "skill__level-text"}, "lvl", skillDiv);
      this._createElement('a', {"class": "skill__name"}, skill.name, skillDiv);
      this._addProgressBar(skillDiv, skill);
      this._createElement(
        'a', {"class": "skill_experience"},
        `${skill.expInThisLevel}/${skill.expTillNextLevel}`, skillDiv
      );
    }

    render () {
      this.rootEl.innerHTML = '';
      this.allSkills = this._appendNewElement('div', {'id': 'all-skills'});
      const data = this.model.data;
      for (let key in data) {
        this.renderskill(this.allSkills, data[key]);
      }
      this.model.addEventListener('changed', () => {this.render()});
    }
  }

  LifeGamification.view.home = new LifeGamification.view.HomeView();
})();
