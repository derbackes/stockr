module.exports = function(app, cb) {
  app.models.Stock.create({
    ticker: 'APPL',
    price: '124'
  }, function(err, car) {
    if (err)
      return cb(err);

    console.log('APPL has been created from a boot script:', car);

    cb();
  });
};
