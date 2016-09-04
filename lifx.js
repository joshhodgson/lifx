var request = require('request');

function lifx(accessToken) {
  this.accessToken = accessToken;
}

lifx.prototype.listLights = function(selector, cb) {
  var url = 'https://api.lifx.com/v1/lights/' + selector;

  if (cb == null)
    throw new Error("Callback Function not defined after selector");
  sendRequest(url, "GET", null, this.accessToken, function(err, res, body) {
    if (err)
      throw (err);

    cb(body);
  });
}



lifx.prototype.togglePower = function(selector, cb) {
  var url = 'https://api.lifx.com/v1/lights/' + selector + '/toggle';

  if (typeof cb == "undefined") cb = function() {};

  sendRequest(url, "POST", null, this.accessToken, function(err, res, body) {
    if (err)
      throw (err);

    cb(body);
  });
}



lifx.prototype.setPower = function(selector, _power, _duration, cb) {
  var url = 'https://api.lifx.com/v1/lights/' + selector + '/state';

  if (typeof cb == "undefined") cb = function() {};
  if (typeof _power == "undefined") _state = "on";
  if (typeof _duration == "undefined") _duration = "1.0";

  sendRequest(url, "PUT", {
    power: _power,
    duration: _duration
  }, this.accessToken, function(err, res, body) {
    if (err)
      throw (err);

    cb(body);
  });
}



lifx.prototype.setColor = function(selector, _color, _duration, _power_on, cb) {
  var url = 'https://api.lifx.com/v1/lights/' + selector + '/state';

  if (typeof cb == "undefined") cb = function() {};
  if (typeof _power_on == "undefined") _power_on = true;
  if (typeof _duration == "undefined") _duration = "1.0";
  if (typeof _color == "undefined") _color = "red";

  sendRequest(url, "PUT", {
    color: _color,
    duration: _duration,
    power_on: _power_on
  }, this.accessToken, function(err, res, body) {
    if (err)
      throw (err);

    cb(body);
  });
}

lifx.prototype.breatheEffect = function(selector, _color, _from_color, _period, _cycles, _persist, _power_on, _peak, cb) {
  var url = 'https://api.lifx.com/v1/lights/' + selector + '/effects/breathe';
  console.log(url);
  if (typeof cb == "undefined") cb = function() {};
  if (typeof _color == "undefined") _color = "red";
  if (typeof _from_color == "undefined") _from_color = "blue";
  if (typeof _period == "undefined") _period = 1.0;
  if (typeof _cycles == "undefined") _cycles = 1.0;
  if (typeof _persist == "undefined") _persist = false;
  if (typeof _power_on == "undefined") _power_on = true
  if (typeof _peak == "undefined") _peak = 1.0;

  sendRequest(url, "POST", {
    color: _color,
    from_color: _from_color,
    period: _period,
    cycles: _cycles,
    persist: _persist,
    power_on: _power_on,
    peak: _peak
  }, this.accessToken, function(err, res, body) {
    if (err)
      throw (err);

    cb(body);
  });
}



lifx.prototype.pulseEffect = function(selector, _color, _from_color, _period, _cycles, _persist, _power_on, _duty_cycle, cb) {
  var url = 'https://api.lifx.com/v1/lights/' + selector + '/effects/pulse';
  console.log(url);
  if (typeof cb == "undefined") cb = function() {};
  if (typeof _color == "undefined") _color = "red";
  if (typeof _from_color == "undefined") _from_color = "blue";
  if (typeof _period == "undefined") _period = 1.0;
  if (typeof _cycles == "undefined") _cycles = 1.0;
  if (typeof _persist == "undefined") _persist = false;
  if (typeof _power_on == "undefined") _power_on = true
  if (typeof _duty_cycle == "undefined") _duty_cycle = 1.0;

  sendRequest(url, "POST", {
    color: _color,
    from_color: _from_color,
    period: _period,
    cycles: _cycles,
    persist: _persist,
    power_on: _power_on,
    duty_cycle: _duty_cycle
  }, this.accessToken, function(err, res, body) {
    if (err)
      throw (err);

    cb(body);
  });
}



//--------------Private Functions----------------



function sendRequest(_url, _method, _data, _key, _cb) {
  _key = "Bearer " + _key;
  request({
    url: _url,
    method: _method,
    form: _data,
    headers: {
      'Authorization': _key
    }
  }, function(error, response, body) {
    _cb(error, response, body);
  });
}

module.exports = lifx;
