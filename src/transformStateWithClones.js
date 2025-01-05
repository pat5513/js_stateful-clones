'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;

      default:
        throw new Error('Unknown type');
    }

    stateVersions.push({ ...stateClone });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
