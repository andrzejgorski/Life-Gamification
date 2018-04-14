(function(){
  LifeGamification.view = {};

  class ViewMenu extends Abstract.View {
    constructor() {
      super();
      this.menuConfig = []
      this.eventFunc = (_) => {console.log("eventFunc not set");};
    }

    _createIcon(click) {
      const img = doc.createElement('img');
      img.src = "../../assets/iconwhite.svg";
      img.setAttribute("class", "header-bar__menu-icon");

      const icon = doc.createElement('a');
      icon.setAttribute("class", "header__menu-icon");
      icon.appendChild(img);
      icon.onclick = click;
      this.rootEl.appendChild(icon);
    }

    _createMenuTag(menuObj) {
      const menuTag = doc.createElement('a');
      menuTag.setAttribute("id", menuObj.name);
      menuTag.setAttribute("class", "header__menu-text");
      menuTag.innerHTML = menuObj.name;
      menuTag.onclick = () => this.eventFunc(menuObj.view);
      this.rootEl.appendChild(menuTag);
    }

    render () {
      this._createIcon(() => {this.eventFunc(LifeGamification.view.home);});
      this.setMenu();
      this.menuConfig.forEach((obj) => this._createMenuTag(obj));
    }

    setMenu () {
      this.menuConfig = [
        {'name': 'Home', 'view': LifeGamification.view.home},
        {'name': 'Edit', 'view': LifeGamification.view.edit},
        {'name': 'Timer', 'view': LifeGamification.timer},
        {'name': 'History', 'view': LifeGamification.history},
        {'name': 'Import-Export', 'view': LifeGamification.importExport},
      ]
    }
  }

  class LifeGamificationMainView extends Abstract.View {
    constructor() {
      super();
      this.rootEl = doc.body;
      this.viewMenu = new ViewMenu();
      this._contentView = null;
    }

    set contentView(view) {
      if (!!(this.contentView)) {
        $(`#${this.contentView.name}`).removeClass('active');
        if (!!(this.contentView.clear)) {
          this.contentView.clear();
        }
      }
      $(`#${view.name}`).addClass('active');
      $("#content").html("");
      this._contentView = view;
      if (!!(this.contentView)) {
        this.contentView.rootEl = this._contentTag;
        this.contentView.render();
      }
    }

    get contentView() {
      return this._contentView;
    }

    _createContentTag() {
      this._contentTag = doc.createElement('div');
      this._contentTag.id = "content";
      this.rootEl.appendChild(this._contentTag);
      return this._contentTag;
    }

    render() {
      this.rootEl.innerHTML = '';

      this.viewMenu.rootEl = doc.createElement('header');
      this.rootEl.appendChild(this.viewMenu.rootEl);
      this.viewMenu.eventFunc = (view) => {this.contentView = view;};
      this.viewMenu.render();

      this._createContentTag();
      if (!!(this.contentView)) {
        this.contentView.rootEl = this._contentTag;
        this.contentView.render();
      }
    }
  }

  LifeGamification.view.startView = function () {
    LifeGamification.view.main = new LifeGamificationMainView();
    const main = LifeGamification.view.main;
    LifeGamification.repository.getSkills()
      .then((json) => {
        LifeGamification.skillsCollection.loadData(json);
        LifeGamification.view.home = new LifeGamification.view.HomeView();
        LifeGamification.view.main.render();
        main.contentView = LifeGamification.view.home;
      })
  }

})();
