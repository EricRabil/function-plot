var utils = require('../utils')
var builtIn = require('./builtIn')
var clamp = require('clamp')
var split = builtIn.split

module.exports = function mathjs (chart, meta, range, nSamples) {
  var allX;
  var yDomain = chart.meta.yScale.domain()
  var yDomainMargin = (yDomain[1] - yDomain[0])
  var yMin = yDomain[0] - yDomainMargin * 1e5
  var yMax = yDomain[1] + yDomainMargin * 1e5
  var data = []
  var step = meta.step || 1;
  var i

  if (meta.step) {
    allX = [];
    for (i = range[0]; i < range[1]; i += step) {
      allX.push(i);
    }
  } else {
    allX = utils.space(chart, range, nSamples);
  }

  var evaluate = meta.scope[meta.fn]
  for (i = 0; i < allX.length; i += 1) {
    var x = allX[i];
    var y = evaluate(x)
    if (utils.isValidNumber(x) && utils.isValidNumber(y)) {
      data.push([x, clamp(y, yMin, yMax)])
    }
  }
  data = split(chart, meta, data)
  return data
}
