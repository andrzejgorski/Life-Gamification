(function () {
  'use strict';

  Abstract.View = class View {
    constructor(model, controller) {
      this._model = model;
      this._controller = controller;
      this._rootEl = null;
    }

    get model() {
      return this._model;
    }
    get controller() {
      return this._controller;
    }
    get rootEl() {
      return this._rootEl;
    }

    set controller(newController) {
      this._controller = newController;
    }
    set model(newModel) {
      this._model = newModel;
    }
    set rootEl(el) {
      this._rootEl = el;
    }
    render() {

    }
  }
})();
