(function(){
  LifeGamification.view = {};
  LifeGamification.skillsView = [];

  const resetActives = function () {
    $('#Home').removeClass('active');
    $('#Edit').removeClass('active');
    $('#Import-Export').removeClass('active');
    $('#Timer').removeClass('active');
    $('#History').removeClass('active');
  }

  LifeGamification.view.resetView = function () {
    LifeGamification.skillsView = [];
    resetActives();
    $(".all-skills").html("");
    $(".import-export").html("");
    $(".add-skill").html("");
    $(".timer").html("");
    $(".history").html("");
    $(".welcome-message").css("display", "none");
    clearInterval(LifeGamification.timer.refreshTimer);
    LifeGamification.view.render(LifeGamification.skillsCollection);
  }

  LifeGamification.view.handleHeaderButtons = function () {
    $('.header-bar__menu-icon').click(function () {
      LifeGamification.currentView = "Home";
      LifeGamification.view.resetView();
    });
    $('#Home').click(function () {
      LifeGamification.currentView = "Home";
      LifeGamification.view.resetView();
    });
    $('#Edit').click(function () {
      LifeGamification.currentView = "Edit";
      LifeGamification.view.resetView();
    });
    $('#Import-Export').click(function () {
      LifeGamification.currentView = "Import/Export";
      LifeGamification.view.resetView();
    });
    $('#Timer').click(function () {
      LifeGamification.currentView = "Timer";
      LifeGamification.view.resetView();
    });
    $('#History').click(function () {
      LifeGamification.currentView = "History";
      LifeGamification.view.resetView();
    });
  }

  LifeGamification.view.render = function (skills) {
    if(LifeGamification.currentView === "Home"){
      LifeGamification.home.render(skills);
      $('#Home').addClass('active');
    }
    if(LifeGamification.currentView === "Edit"){
      LifeGamification.edit.render(skills);
      $('#Edit').addClass('active');
    }
    if(LifeGamification.currentView === "Import/Export"){
      LifeGamification.importExport.render();
      $('#Import-Export').addClass('active');
    }
    if(LifeGamification.currentView === "Timer"){
      LifeGamification.timer.render(skills);
      $('#Timer').addClass('active');
    }
    if(LifeGamification.currentView === "History"){
      LifeGamification.history.render(skills)
      $('#History').addClass('active');
    }
  }

  LifeGamification.view.startView = function () {
    LifeGamification.repository.getSkills()
      .then(LifeGamification.models.createSkillsCollection)
      .then(LifeGamification.view.render);
  }
})();
