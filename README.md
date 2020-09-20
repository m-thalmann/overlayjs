# overlayJS

OverlayJS is a simple JavaScript library, to display overlays.

**Demo:** https://prod.thalmann.it/overlayjs/demo.html

## Navigation
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
  - [Overlay](#overlay)
  - [OverlayManager](#overlaymanager)
  - [Events](#events)
  - [Options](#options)
- [Example](#example)

## Installation
1. Download the .zip-File and put it in your project-folder.

2. Add this script-tag to the head of the file
```html
<script src="path/to/js/file.js"></script>
```

3. Add this link-tag to the head of the file, to include the styles
```html
<link rel="stylesheet" href="path/to/css/file.css" />
```

4. Start using the library!

## Usage
### Create new Overlay
```javascript
var overlay = new Overlay();
```

### Change the text
```javascript
overlay.content.innerHTML = "This is a overlay";
```

### Close it
```javascript
overlay.close();
```

### Open it again
```javascript
overlay.open();
```

## Documentation
### Overlay
Its the main object to display a overlay.
#### Instanciating
```javascript
new Overlay(options);
```
- **options** (object): A object with options for the overlay (see [below](#options)) **(optional)**

After instanciating the overlay is shown (if not defined otherwise)

#### Methods
```javascript
overlay.open();                  // Opens the overlay, if its not allready open
overlay.close(force);            // Closes the overlay, if its not allready closed;
                                 // if the force parameter is set, it will be closed for sure (boolean)
overlay.isOpened();              // Returns true, if the overlay is open, otherwise false

overlay.on(event, callback);     // Sets the eventlistener of the event, if the callback is specified;
                                 // if only the event is set, it returns the callback-function; if that is not
                                 // set, it returns a empty function (string, function)
overlay.removeOn(event);         // Removes the eventlistener for the event, if set (string)

overlay.reset();                 // Resets the content of the overlay
```

#### Variables
```javascript
overlay.content                  // A div, that contains the content of the overlay (edit this!)

Overlay.CLOSING_DURATION         // Sets, when the overlay is removed from the DOM after closing (ms)
```

### OverlayManager
Its used to manage overlays, so that only one at a time is displayed. Can't be instanciated.
#### Methods
```javascript
OverlayManager.create(options);  // Creates a new overlay, adds it to the manager and returns it;
                                 // the returned overlay is not a instance of Overlay but
                                 // of a anonymous type (object)
OverlayManager.remove(overlay);  // Remove the overlay completely (can't open it again) (anonymous overlay-type)
```
The recieved overlay from the OverlayManager can be used normally.

### Events
It is possible to attach a event to a overlay: overlay.on(event, callback);

| Event | Definition |
|---------|------------------------------------------------------------------------------------------------------|
| opening | Is triggered, before the overlay is opened; if the callback returns false, the overlay is not opened |
| open | Is triggered, after the overlay is opened |
| closing | Is triggered, before the overlay is closed; if the callback returns false, the overlay is not closed |
| close | Is triggered, after the overlay is closed |

### Options

| Option | Values | Definition |
|----------|------------|-------------------------------------------------------|
| closable | true/false | Defines, if the overlay is closable by the user |
| opened | true/false | Defines, if the overlay is opened on creation, or not |

## Example
### Code
```javascript
var overlay = new Overlay();

var btn_close = document.createElement("button");
btn_close.innerHTML = "Close";
btn_close.onclick = overlay.close;

overlay.content.appendChild(btn_close);
overlay.content.style.textAlign = "center";
```

### Output

![overlayJs example](demo/example.gif)
