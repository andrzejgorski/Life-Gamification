(function(){
  LifeGamification.view = {};
  LifeGamification.skillsView = [];

  class LifeGamificationMainView {
    set currentView(view) {
      if (!!(this._currentView)) {
        $(`#${this._currentView.name}`).removeClass('active');
      }
      $(`#${view.name}`).addClass('active');
      this._currentView = view;
      this.render();
    }

    get currentView() {
      return this._currentView;
    }

    _cleanContent() {
      $("#content").html("");
    }

    render() {
      // TODO Move it somewhere.
      LifeGamification.skillsView = [];
      this._cleanContent();
      // TODO Move clearInterval function to different module
      clearInterval(LifeGamification.timer.refreshTimer);
      if (!!(this.currentView)) {
        this.currentView.render();
      }
    }

    startView () {
      LifeGamification.view.main._initMenuButtons();
      LifeGamification.repository.getSkills()
        .then(LifeGamification.models.createSkillsCollection)
        .then(function () {
          LifeGamification.view.main.currentView = LifeGamification.home;
        })
    }

    _initMenuButtons () {
      $('.header-bar__menu-icon').click(() => {
        this.currentView = LifeGamification.home;
      });
      $('#Home').click(() => {
        this.currentView = LifeGamification.home;
      });
      $('#Edit').click(() => {
        this.currentView = LifeGamification.edit;
      });
      $('#Import-Export').click(() => {
        this.currentView = LifeGamification.importExport;
      });
      $('#Timer').click(() => {
        this.currentView = LifeGamification.timer;
      });
      $('#History').click(() => {
        this.currentView = LifeGamification.history;
      });
    }
  }

  LifeGamification.view.main = new LifeGamificationMainView();
})();
