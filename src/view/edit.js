(function(){
  LifeGamification.edit = {};
  LifeGamification.edit.name = "Edit";

  let skillsView = [];

  const skillEditHTML = function (number) {
    return (`
    	<div class="skill">
        <img src="../../assets/x.svg"class="skill__remove" id="remove${number}">
      `) + LifeGamification.home.skillHTML(number);
  }

  const appendEditSkill = function (skill) {
    $('#all-skills').append(skillEditHTML(skillsView.length));
    skillsView.push(skill);
    LifeGamification.home.viewLevelAndExp(skillsView, skill);
  }

  const render = function (skills) {
    skillsView = [];
    $('#content').html('');
    $('#content').append(`<div id="all-skills"> </div>`)
    $('#content').append(`<div id="add-skill"> </div>`)
    for (let name in skills) {
      appendEditSkill(skills[name]);
    }
    $('#add-skill').html(`
      <textarea id="add-skill__name" placeholder="New skill name"></textarea>
      <div id="add-skill__button">
        <span id="add-skill__button-helper"></span><img src="../../assets/plus.svg" id="add-skill__button-icon">
      </div>
    `);
    handleAddSkillButton();
    LifeGamification.home.handleSkillButtons();
    appendRemoveButtons();
  }

  const appendRemoveButtons = function () {
    $("#all-skills").on("click", ".skill__remove", function () {
      const skillNr = this.id.replace('remove', '');
      LifeGamification.models.removeSkill(skillsView[skillNr])
        .then(() => {
          LifeGamification.view.main.currentView = LifeGamification.edit;
        });
    });
  }

  LifeGamification.edit.render = function () {
    render(LifeGamification.skillsCollection);
  }

  const handleAddSkillButton = function () {
    const add_skill = function () {
      const skillName = $('#add-skill__name').val();
      $('#add-skill__name').val('');
      LifeGamification.models.addSkill(skillName)
        .then((skill) => {
          LifeGamification.edit.render();
        });
    }

    $('#add-skill__button-icon').click(add_skill);
    $('#add-skill__name').keyup(function (event) {
      if (event.keyCode === 13) {
        add_skill();
      }
    });
  }
})();
