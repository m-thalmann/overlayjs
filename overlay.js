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
        return;
      }

      open = true;
      overlay.appendChild(this.content);
      document.body.appendChild(overlay);
      self.on("open")();
    }

    this.close = function(){
      if(!open || self.on("closing")() === false){
        return;
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
