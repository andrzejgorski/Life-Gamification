(function(){
  LifeGamification.view = {};

  class LifeGamificationMainView {
    set currentView(view) {
      if (!!(this._currentView)) {
        $(`#${this._currentView.name}`).removeClass('active');
        if (!!(this._currentView.clear)) {
          this._currentView.clear();
        }
      }
      $(`#${view.name}`).addClass('active');
      this._currentView = view;
      this.render();
    }

    get currentView() {
      return this._currentView;
    }

    render() {
      $("#content").html("");
      if (!!(this.currentView)) {
        this.currentView.render();
      }
    }

    startView () {
      this._createMenu();
      LifeGamification.repository.getSkills()
        .then(function (json) {
          LifeGamification.skillsCollection.loadData(json);
          LifeGamification.view.main.currentView = LifeGamification.view.home;
        })
    }

    _createMenu () {
      const menuConfig = {
        '.header-bar__menu-icon': LifeGamification.view.home,
        '#Home': LifeGamification.view.home,
        '#Edit': LifeGamification.edit,
        '#Import-Export': LifeGamification.importExport,
        '#Timer': LifeGamification.timer,
        '#History': LifeGamification.history,
      }
      for (let name in menuConfig) {
        $(name).click(() => {
          this.currentView = menuConfig[name];
        });
      }
    }
  }

  LifeGamification.view.main = new LifeGamificationMainView();
})();
