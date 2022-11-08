// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  OldapiConn: 'http://74.208.176.115/trotsapi/',
  apiConn: 'https://api.trots.education/',
  Dev_apiConn: 'https://api-dev.trots.education/',
  apiAccessKey: 'VHIwdDUuQFBJLnZAMS5WMYB3DuN3INEzcMWb0T8POHY=',
  twilio_SID: 'AC663b2f8e375f5650288d18730c52f314',
  twilio_AuthToken : '510e948c7d9b051424d1fff449b6ec60',
  twilio_basurl:'https://video.twilio.com/v1/',
  // stripeKey:'pk_test_51KleK7AT0TYVhjQ32us4A9vnlFgQ3Ed9HtEA4T5ZLyiSLl5jUQEQVZjcjWItZaZ2kcWAklMqh8U9dcJm8ryzpPGP00uzGTiW8V'
  stripeKey:"pk_live_51KleK7AT0TYVhjQ3rsKeyM0QRPlKeVmWWXaA7WWHujiPsVZ6GocdpwTJmozTAikGGX0De49jDTR9foAiQwKlXyq700oR1C1zkT"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
