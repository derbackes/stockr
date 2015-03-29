module.exports = function(app, cb) {
  app.models.Stock.create({
    ticker: 'CLX',
    price: '107'
  }, function(err, car) {
    if (err)
      return cb(err);

    console.log('CLX has been created from a boot script:', car);

    cb();
  });
};
