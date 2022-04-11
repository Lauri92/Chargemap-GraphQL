export default (app, port) => {
  app.enable('trust proxy');
  console.log('in prod');
// Add a handler to inspect the req.secure flag (see
// https://expressjs.com/en/api.html#req.secure). This allows us
// to know whether the request was via http or https.
// https://github.com/aerwin/https-redirect-demo/blob/master/server.js
  app.use((req, res, next) => {
    if (req.secure) {
      // request was via https, so do no special handling
      console.log('was https');
      next();
    } else {
      // request was via http, so redirect to https
      res.redirect('https://' + req.headers.host + req.url);
    }
  });

  app.listen(port, () => {
    console.log(`app listen on port ${port} (production)`);
  });

}