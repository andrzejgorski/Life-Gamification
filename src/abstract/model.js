(function(){
  'use strict';

  Abstract.Observable = class Observable {
    constructor () {
      this.events = {};
    }

    addEventListener(eventName, callback) {
      if (!(eventName in this.events)) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
    }

    fireEvent(eventName, data) {
      if (Array.isArray(this.events[eventName])) {
        const events = this.events[eventName].concat([]);
        events.forEach(evt => evt(data));
      }
    }
  };

  Abstract.Model = class Model extends Abstract.Observable {
    constructor() {
      super();
      this.properties = {};
    }

    get(key) {
      return this.properties[key];
    }

    set(key, value) {
      if (this.properties[key] === value) {
        return;
      }
      this.properties[key] = value;
      this.fireEvent('change');
    }

    remove(key) {
      delete this.properties[key];
      this.fireEvent('change');
    }

    cleanCollection() {
      this.properties = {};
      this.fireEvent('change');
    }
  };
})();
