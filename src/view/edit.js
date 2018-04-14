(function(){
  class EditSkill extends  LifeGamification.view.SkillView {
    _addRemoveButton() {
      const removeButton = this._appendNewElement(
        'img', {
          "class": "skill__remove",
          "src": "../../assets/x.svg"
        });
      removeButton.onclick = () => {
        this.removeFunc(this.model);
      }
    }
    render() {
      this._addTitle();
      this._addRemoveButton();
      this._addProgressBar();
      this._addExpTillNextLevel();
    }
  }

  const EditView = class EditView extends LifeGamification.view.HomeView {
    _addViewChild(skill) {
      const editSkill = new EditSkill(skill);
      editSkill.removeFunc = (skill) => this.model.remove(skill);
      this.viewChildren.push(editSkill);
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
