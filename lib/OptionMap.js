
/**
 * Example:
 * new OptionsMap('authorize', (req, res, next) => {}, true)
 */

function OptionMap(option = '', handler, active = false) {
  const self = this;
  self.option = option;
  self.handler = handler;
  self.active = active;
};

module.exports = OptionMap;