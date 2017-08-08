﻿/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular': 'node_modules/@angular',
    '@angular/material': 'npm:@angular/material/bundles/material.umd.js'
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    // ng2-bootstrap
    'moment': 'node_modules/moment',
    'ng2-bootstrap': 'node_modules/ng2-bootstrap',
    'ng2-bs3-modal': 'node_modules/ng2-bs3-modal'//added by ME; here practically tells it where are the modules to load; will add them to 'bundles' dir
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    // ng2-bootstrap
    'ng2-bootstrap':              { format: 'cjs', main: 'bundles/ng2-bootstrap.umd.js', defaultExtension: 'js' },
    'moment': { main: 'moment.js', defaultExtension: 'js' },
    'ng2-bs3-modal': {main: 'bundles/ng2-bs3-modal.js', defaultExtension: 'js'}//tell it the main js from the bundles dir
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);