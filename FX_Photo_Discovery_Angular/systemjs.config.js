/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app': 'app', // 'dist',
    '@angular': 'node_modules/@angular',
    '@angular/core': 'node_modules/@angular/core',
    '@angular/animations': 'node_modules/@angular/animations',
    '@angular/common': 'node_modules/@angular/common',
    '@angular/compiler': 'node_modules/@angular/compiler',
    '@angular/http': 'node_modules/@angular/http',
    '@angular/forms': 'node_modules/@angular/forms',
    '@angular/router': 'node_modules/@angular/router',
    '@angular/platform-browser': 'node_modules/@angular/platform-browser',
    '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic',
    '@angular/animations/browser': 'node_modules/@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations': 'node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/material': 'node_modules/@angular/material',
    '@angular/cdk': 'node_modules/@angular/cdk',

    'rxjs':                       'node_modules/rxjs'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { main: 'index', defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'core',
    'animations',
    'common',
    'compiler',
    'http',
      'forms',
      'router',
    'platform-browser',
    'platform-browser-dynamic',
    'router-deprecated',
      'upgrade',
      'material',
    'cdk',
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