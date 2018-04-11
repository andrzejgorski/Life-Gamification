(function () {
  'use strict';

  Abstract.Controller = class Controller {
    constructor (model) {
      this.model = model;
    }

    getView() {
      return this.view;
    }
    getModel() {
      return this.model;
    }

    setView(newView) {
      this.view = newView;
    }
    setModel(newModel) {
      this.model = newModel;
    }
  }
})();
