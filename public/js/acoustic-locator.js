(function (window, $, undefined) {
    'use strict';

    var acousticlocator;

    acousticlocator = function acousticlocator(cockpit) {
        console.log("Loading acoustic-locator plugin in the browser.");

        // Instance variables
        this.cockpit = cockpit;

    //example keyboard hook
    /*
    this.cockpit.emit('inputController.register',
      {
        name: "acoustic-locator.keyBoardMapping",
        description: "Example for keymapping.",
        defaults: { keyboard: 'alt+0', gamepad: 'X' },
        down: function() { console.log('0 down'); },
        up: function() { console.log('0 up'); },
        secondary: [
          {
            name: "acoustic-locator.keyBoardMappingDepdent",
            dependency: "acoustic-locator.keyBoardMapping",
            defaults: { keyboard: '9', gamepad: 'RB' },
            down: function() { console.log('####'); }
          }
        ]
      });
    */

    // for plugin management:
    this.name = 'acoustic-locator';   // for the settings
    this.viewName = 'acoustic-locator plugin'; // for the UI
    this.canBeDisabled = true; //allow enable/disable
    this.enable = function () {
      alert('acoustic-locator enabled');
    };
    this.disable = function () {
      alert('acoustic-locator disabled');
    };
  };

  //This will be called by the input manager automatically
  acousticlocator.prototype.listen = function listen() {
    var alplugin = this;

    //This snippet allows you to listen to events coming
    //from the beaglebone.  Those coulbe be navdata, status, etc...

    //This snippet allows you to listen to events coming
    //from the beaglebone.  Those coulbe be navdata, status, etc...
    this.cockpit.socket.on('acousticlocation', function (data) {
      //data is a JSON payload that can be accessed directly.

      console.log(data.collectorRuntimeMS);
      console.log(data.points);
      console.log(data.points.length);
      console.log(data.collectionDurationMS);

    });


    //This example will put an entry in the pop-up Heads Up Menu
    /*
    var item = {
      label: ko.observable("acoustic-locator menu"),
      callback: function () {
        alert('acoustic-locator menu item');
        item.label(this.label() + " Foo Bar");
      }
    };
    rov.cockpit.emit('headsUpMenu.register', item);
    */

    //the code below is used to load other asssets that have a path relative to the current
    //path of the executing javascript file.
    var jsFileLocation = urlOfJsFile('acoustic-locator.js');

    /*
    $.get(jsFileLocation + '../somefile.txt',function(data){
      console.log(data);
    });
    */

    // If you have more than a couple lines of HTML it might be better
    // to place them in a seperate .html file. The code below will load
    // them in to an element.
    /*
    $('#divtoloadcontent').load(jsFileLocation + '../template.html',function(data){
      console.log('template loaded');
    });
    */

    //For loading third party libraries that are bower dependencies
    /*
    $.getScript('plugin_components/<projectname>/<filetoload>.js',function(){
      console.log("loaded");
    });
    */

  };

    window.Cockpit.plugins.push(acoustic-locator);

}(window, jQuery));
