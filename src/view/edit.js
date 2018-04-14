(function(){
  class EditSkill extends  LifeGamification.view.SkillView {
    render() {
      this._appendNewElement(
        'a', {"class": "skill__level-number"}, this.model.level);
      this._appendNewElement(
        'a', {"class": "skill__level-text"}, "lvl");
      this._appendNewElement('a', {"class": "skill__name"}, this.model.name);
      const removeButton = this._appendNewElement(
        'img', {
          "class": "skill__remove",
          "src": "../../assets/x.svg"
        });
      removeButton.onclick = () => {
        this.removeFunc(this.model);
      }
      this._addProgressBar();
      this._appendNewElement(
        'a', {"class": "skill_experience"},
        `${this.model.expInThisLevel}/${this.model.expTillNextLevel}`,
      );
    }
  }

  const EditView = class EditView extends LifeGamification.view.HomeView {
    _initChildren() {
      this.viewChildren = [];
      for (let index in this.model.data) {
        const skill = this.model.data[index];
        const editSkill = new EditSkill(skill);
        editSkill.removeFunc = (skill) => this.model.remove(skill);
        this.viewChildren.push(editSkill);
      }
    }

    _createAddSkill () {
      const addSkill = this._appendNewElement('div', {"id": "add-skill"})
      const addSkillText = this._createElement(
        'textarea', {"id": "add-skill__name", "placeholder": "New skill name"},
        '', addSkill
      );
      addSkillText.onkeyup = (event) => {
        if (event.keyCode === 13) {
          this.model.addSkill(addSkillText["value"]);
        }
      }
      const addSkillButton = this._createElement(
        'div', {"id": "add-skill__button"}, '', addSkill
      );
      addSkillButton.onclick = () => {
        this.model.addSkill(addSkillText["value"]);
      };
      this._createElement(
        'span', {"id": "add-skill__button-helper"}, '', addSkillButton);
      this._createElement(
        'img', {
          "id": "add-skill__button-icon",
          "src": "../../assets/plus.svg"
        }, '', addSkillButton);
    }

    render() {
      super.render();
      this._createAddSkill();
    }
  }

  LifeGamification.view.EditView = EditView;
})();
