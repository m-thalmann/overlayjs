/**
* A simple JavaScript library, to display overlays, alerts, prompts, confirms and toasts
*
* @author Matthias Thalmann (https://github.com/m-thalmann/)
* @license MIT
*/

var Overlay = (function(){
  var CLOSING_DURATION = 500; //ms

  function Overlay(options){
    var overlay = document.createElement("div");
    overlay.className = "overlay";
    var open = false;
    var events = [];
    var self = this;

    this.content = null;

    this.open = function(){
      if(open || self.on("opening")() === false){
        return false;
      }

      open = true;
      overlay.appendChild(this.content);
      document.body.appendChild(overlay);
      self.on("open")();
    }

    this.close = function(force){
      if(!open || (!force && self.on("closing")() === false)){
        return false;
      }

      overlay.classList.add("overlay_closing");
      setTimeout(function(){
        overlay.remove();
        overlay.classList.remove("overlay_closing");
        open = false;
        self.on("close")();
      }, CLOSING_DURATION);
    }

    this.on = function(ev, callback){
      if(typeof callback !== "function"){
        if(typeof events[ev] === "function"){
          return events[ev];
        }else{
          return function(){};
        }
      }else{
        events[ev] = callback;
      }
    }

    this.removeOn = function(ev){
      delete events[ev];
    }

    this.isOpened = function(){
      return open;
    }

    //Init
    (function(){
      if(typeof options !== "object"){
        options = {};
      }

      self.content = document.createElement("div");
      self.content.className = "overlay_content";

      if(getProperty(options, "closable", true)){
        overlay.addEventListener("click", function(e){
          if(!isDescendant(self.content, e.target)){
            self.close();
          }
        });
      }

      if(getProperty(options, "opened", true)){
        self.open();
      }
    }());
  }

  function getProperty(options, opt, def){
    if(typeof options[opt] !== "undefined"){
      return options[opt];
    }else{
      return def;
    }
  }

  function isDescendant(parent, node){
    while(node != parent && node != document.body){
      node = node.parentElement;
    }

    return node == parent;
  }

  return Overlay;
}());

var OverlayManager = (function(){
  var overlays = [];
  var opened = -1;

  const _manager = {
    create(options){
      if(typeof options === "undefined"){
        options = {opened: true};
      }
      var to_open = false;

      if(typeof options.opened !== "undefined"){
        to_open = options.opened;
      }

      options.opened = false;

      var pos = overlays.push(new Overlay(options)) - 1;

      var nov = new ManagedOverlay(pos);
      console.log(to_open);
      if(to_open){
        nov.open();
      }

      return nov;
    },

    remove(moverlay){
      var pos = moverlay.getPos();
      overlays[pos].close();
      delete overlays[pos];
    }
  };

  function ManagedOverlay(pos){
    this.content = overlays[pos].content;

    this.open = function(){
      return open(pos);
    }

    this.close = function(force){
      return close(pos, force);
    }

    this.on = function(ev, callback){
      return overlays[pos].on(ev, callback);
    }

    this.removeOn = function(ev){
      return overlays[pos].removeOn(ev);
    }

    this.isOpened = function(){
      return overlays[pos].isOpened();
    }

    this.getPos = function(){
      return pos;
    }
  }

  function open(pos){
    if(overlays[pos] instanceof Overlay){
      if(opened != -1){
        if(overlays[opened].close() !== false){
          opened = pos;
          overlays[pos].open();
        }else{
          console.warn("The currently open overlay does not want to be closed");
        }
      }else{
        opened = pos;
        overlays[pos].open();
      }
    }else{
      throw new Error("This overlay has been deleted");
    }
  }

  function close(pos, force){
    if(overlays[pos] instanceof Overlay){
      if(opened == pos){
        if(overlays[pos].close(force) !== false){
          opened = -1;
        }
      }
    }else{
      throw new Error("This overlay has been deleted");
    }
  }

  return _manager;
}());
