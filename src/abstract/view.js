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

    _createElement(element, attribute, inner, father) {
      if(typeof(element) === "undefined")
      {
        return false;
      }
      if(typeof(inner) === "undefined") {
        inner = "";
      }
      var el = document.createElement(element);

      if(typeof(attribute) === 'object') {
        for(var key in attribute){
          el.setAttribute(key, attribute[key]);
        }
      }
      if(!Array.isArray(inner)) {
        inner = [inner];
      }
      for(var k = 0; k < inner.length; k++) {
        if(inner[k].tagName) {
          el.appendChild(inner[k]);
        } else {
          el.appendChild(document.createTextNode(inner[k]));
        }
      }
      if(typeof(father) === "object") {
        father.appendChild(el);
      }
      return el;
    }

    _appendNewElement(element, attribute, inner) {
      return this._createElement(element, attribute, inner, this.rootEl);
    }
  }
})();
