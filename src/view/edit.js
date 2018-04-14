(function(){

  const EditView = class EditView extends LifeGamification.view.HomeView {
    renderSkillDivContent(skillDiv, skill) {
      const removeButton = this._createElement(
        'img', {
          "class": "skill__remove",
          "src": "../../assets/x.svg"
        }, '', skillDiv);
      removeButton.onclick = () => {
        this.model.remove(skill);
      }
      super.renderSkillDivContent(skillDiv, skill);
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
