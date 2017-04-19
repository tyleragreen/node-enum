'use strict';

function Enum(keys) {
  if (!(keys instanceof Array)) {
    throw new Error('Expected keys to be an array!');
  }
  
  const map = {};
  
  keys.forEach(key => {
    map[key] = key;
  });
  map.ALL = Object.values(map);
  
  map.isValid = function(key) {
    return map.hasOwnProperty(key);
  };
  // Using Enum.find(expr) is the same as Enum[expr]
  map.find = function(property) {
    return testProperty(map, property);
  };
  
  map[Symbol.iterator] = function () {
    let nextIndex = 0;
    
    return {
      next: function() {
        return nextIndex < keys.length ?
          { value: map.ALL[nextIndex++], done: false } :
          { done: true };
      }
    };
  };
  
  function testProperty(map, property) {
    if (!map[property]) {
      throw new Error(`Member '${property}' not found on the Enum.`);
    }
    return map[property];
  }
  
  return new Proxy(map, {
    get: (target, property) => {
      return testProperty(map, property);
    },
    set: (target, property, value) => {
      throw new Error('Enum members may not be added.');
    }
  });
}

module.exports = Enum;
