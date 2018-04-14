(function(){
  LifeGamification.view = {};

  class ViewMenu extends Abstract.View {
    constructor(menuConfig) {
      super();
      this._menuConfig = menuConfig;
      this.eventFunc = (_) => {console.log("eventFunc not set");};
      this._activeElem = null;
    }

    _createIcon(click) {
      const iconn = this._appendNewElement('a', {
        "class": "header__menu-icon"
      }, '');

      this._createElement('img', {
        "src": "../../assets/iconwhite.svg",
         "class": "header-bar__menu-icon"
      }, '', iconn);
      iconn.onclick = click;
    }

    set activeElem (tag) {
      if (!!(this._activeElem)) {
        this._activeElem.classList.remove('active');
      }
      tag.classList.add('active');
      this._activeElem = tag;
    }

    _createMenuTag(name, view) {
      const menuTag = this._appendNewElement('a', {
        "id": name,
        "class": "header__menu-text"
      }, name);
      menuTag.onclick = () => {
        this.activeElem = menuTag;
        this.eventFunc(view);
      }
      this._menuTags[name] = menuTag;
    }

    render () {
      this._createIcon(() => {
        this.eventFunc(this._menuConfig['Home']);
        this.activeElem = this.homeView;
      });
      this._menuTags = {};
      for (let name in this._menuConfig) {
        this._createMenuTag(name, this._menuConfig[name]);
      }
      this.activeElem = this._menuTags['Home'];
    }
  }

  class LifeGamificationMainView extends Abstract.View {
    constructor() {
      super();
      this.rootEl = doc.body;
      this._createSubViews();
      this.viewMenu = new ViewMenu(this._subViews);
      this._contentView = this._subViews['Home'];
    }

    _createSubViews () {
      this._subViews = {
        'Home': new LifeGamification.view.HomeView(
          LifeGamification.skillsCollection),
        'Edit': new LifeGamification.view.EditView(
          LifeGamification.skillsCollection),
        'Timer': LifeGamification.timer,
        'History': LifeGamification.history,
        'Import-Export': LifeGamification.importExport,
      }
    }

    set contentView(view) {
      if (!!(this.contentView) && !!(this.contentView.clear)) {
        this.contentView.clear();
      }
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
      this._contentTag = this._createElement('div', {'id': 'content'}, '');
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
        LifeGamification.view.main.render();
      })
  }

})();
