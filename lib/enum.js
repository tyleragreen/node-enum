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

  // ------------------------------------------------
  // Install an iterator that iterates over the
  // enum keys

  map[Symbol.iterator] = function() {
    let nextIndex = 0;

    const members = Object.values(map);

    return {
      next: function() {
        return nextIndex < keys.length ? {value: members[nextIndex++], done: false} : {done: true};
      },
    };
  };

  function testProperty(map, property) {
    if (!map[property]) {
      throw new Error(`Member '${property}' not found on the Enum.`);
    }
    return map[property];
  }

  const functions = {
    // ------------------------------------------------
    // Return an array of enums
    toArray: function() {
      return Object.values(map);
    },

    // ------------------------------------------------
    // Check if an enum key is valid
    isValid: function(key) {
      return map.hasOwnProperty(key);
    },

    // ------------------------------------------------
    // Enum to string
    toString: function() {
      return 'Enum{' + functions.toArray().join(', ') + '}';
    },
  };

  // ------------------------------------------------
  // Restrict reads and writes of properties to this
  // Enum object
  return new Proxy(map, {
    get: (target, property) => {
      if (functions[property]) {
        return functions[property];
      }
      return testProperty(map, property);
    },
    set: (target, property, value) => {
      throw new Error('Enum members may not be added.');
    },
  });
}

module.exports = Enum;
