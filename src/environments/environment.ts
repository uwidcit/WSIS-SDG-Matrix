// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// (NB as of 03-Apr-2019 this does not work as expected)

export const environment = {
  production: false,
  use_service_worker: false,
  google_analytics_id: 'UA-132994026-1',
  use_tracking: false,
  is_debug: true,
  release: "1.3.0",
  runtime_envi: "staging",
  sentry_dsn: "https://4852a8e4c6004ed29198042d6473dbe3@sentry.io/1370709"
};

export const firebase = {
  apiKey: "AIzaSyB42T8YHEhg-A8mnLx2-05wP7i4Y25ZgTI",
  authDomain: "wsis-sdg.firebaseapp.com",
  databaseURL: "https://wsis-sdg.firebaseio.com",
  projectId: "wsis-sdg",
  storageBucket: "wsis-sdg.appspot.com",
  messagingSenderId: "3309621460"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
