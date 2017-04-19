'use strict';

/*

A simple Javascript enum.

Tyler A. Green <greent@tyleragreen.com>

*/

function Enum(keys) {
  if (!(keys instanceof Array)) {
    throw new Error('Expected keys to be an array!');
  }
  
  const map = {};
  keys.forEach(key => {
    map[key] = key;
  });
  map.ALL = Object.values(map);
  
  // ------------------------------------------------
  // Check if an enum key is valid
  
  map.isValid = function(key) {
    return map.hasOwnProperty(key);
  };
  
  // ------------------------------------------------
  // Install an iterator that iterates over the
  // enum keys
  
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
  
  // ------------------------------------------------
  // Restrict reads and writes of properties to this
  // Enum object
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
