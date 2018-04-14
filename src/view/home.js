(function(){
  const welcome_message = `
    <p>Welcome to Life Gamification!<br>
    To add your first skill go to Edit skills.</p>`;

  class SkillView extends Abstract.View {
    _addTitle() {
      this._appendNewElement(
        'a', {"class": "skill__level-number"}, this.model.level);
      this._appendNewElement(
        'a', {"class": "skill__level-text"}, "lvl");
      this._appendNewElement('a', {"class": "skill__name"}, this.model.name);
    }

    _addExpTillNextLevel() {
      this._appendNewElement(
        'a', {"class": "skill_experience"},
        `${this.model.expInThisLevel}/${this.model.expTillNextLevel}`,
      );
    }

    render() {
      this._addTitle();
      this._addProgressBar();
      this._addExpTillNextLevel();
    }

    _addProgressBar() {
      const barWrapper = this._appendNewElement(
        'div', {"class": "progress-bar__wrapper"}, '');
      const container = this._createElement(
        'span', {"class": "progress-bar__container"}, '', barWrapper);
      const percent = Math.floor(
        100 * this.model.expInThisLevel / this.model.expTillNextLevel);

      this._createElement(
        'span', {
          "class": "progress-bar__container-fill",
          "style": `width: ${percent}%`
        },
        `${percent}%`, container
      );

      const pg_buttons = this._createElement(
        'div', {"class": "progress-bar__buttons"}, '', barWrapper);
      this._createInput(pg_buttons);
    }

    _createInput(pg_buttons) {
      const input = this._createElement('input', {
          "class": "progress-bar__add-input",
          "type": "number",
          "value": "1"
        }, '', pg_buttons
      );
      input.onkeyup = (event) => {
        if (event.keyCode === 13) {
          this._addSkillExp(input);
        }
      };

      const addButton = this._createElement(
        'span', {"class": "progress-bar__add-button"}, "+", pg_buttons);

      addButton.onclick = () => {
        this._addSkillExp(input);
      }
    }

    _addSkillExp(input) {
      const addedExp = parseInt(input["value"]);
      input.setAttribute("value", "1");
      this.model.addExp(addedExp);
    }
  }

  LifeGamification.view.SkillView = SkillView;

  LifeGamification.view.HomeView = class HomeView extends Abstract.View {
    _addViewChild(skill) {
      this.viewChildren.push(new SkillView(skill));
    }

    _initChildren() {
      this.viewChildren = [];
      for (let index in this.model.data) {
        const skill = this.model.data[index];
        this._addViewChild(skill);
      }
    }

    render() {
      this.rootEl.innerHTML = '';
      this.allSkills = this._appendNewElement('div', {'id': 'all-skills'});
      this._initChildren();
      for (let index in this.viewChildren) {
        let skillDiv = this._createElement(
          'div', {"class": "skill"}, '', this.allSkills);
        this.viewChildren[index].rootEl = skillDiv;
        this.viewChildren[index].render();
      }
      this.model.addEventListener('changed', () => {this.render()});
    }
  }
})();
