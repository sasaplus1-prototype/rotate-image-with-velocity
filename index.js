(function(){

  'use strict';

  function loadImage(path) {
    return new Promise(function(resolve, reject) {
      var image = new Image();

      image.onerror = reject;
      image.onload = function() {
        resolve(image);
      };

      image.src = path;
    });
  }

  function rotate(element, width, callback) {
    var options = {
      duration: 150
    };

    return Promise
      .resolve()
      .then(function() {
        return Velocity(element, 'stop');
      })
      .then(function() {
        return Velocity(element, {
          left: Math.floor(width / 2),
          width: 0
        }, options);
      })
      .then(callback)
      .then(function() {
        return Velocity(element, {
          left: 0,
          width: width
        }, options);
      });
  }

  function getImagePathByRandom() {
    var images, index;
    
    images = [
      'sushiyukicon_amaebi.png',
      'sushiyukicon_anago.png',
      'sushiyukicon_ebi.png',
      'sushiyukicon_futomaki.png',
      'sushiyukicon_hamachi.png',
      'sushiyukicon_ika.png',
      'sushiyukicon_ikura.png',
      'sushiyukicon_kappamaki.png',
      'sushiyukicon_kohada.png',
      'sushiyukicon_maguro.png',
      'sushiyukicon_menegi.png',
      'sushiyukicon_negitoro.png',
      'sushiyukicon_null.png',
      'sushiyukicon_oinarisan.png',
      'sushiyukicon_saba.png',
      'sushiyukicon_salmon.png',
      'sushiyukicon_tamago.png',
      'sushiyukicon_tekkamaki.png',
      'sushiyukicon_toro.png',
      'sushiyukicon_uni.png'
    ];

    index = Math.floor(Math.random() * images.length);

    return images[index];
  }

  function rotateArtwork(artworkElement, initialArtworkWidth) {
    return Promise
      .resolve()
      .then(function() {
        return getImagePathByRandom();
      })
      .then(function(path) {
        return loadImage(path);
      })
      .then(function(image) {
        return rotate(artworkElement, initialArtworkWidth, function() {
          artworkElement.src = image.src;
        });
      });
  }

  function onLoad() {
    var artworkElement = document.getElementById('js-artwork'),
        initialArtworkWidth = artworkElement.scrollWidth;

    setInterval((function() {
      rotateArtwork(
        this.artworkElement,
        this.initialArtworkWidth
      )['catch'](function() {
        if (window.console === void 0 || window.console === null) {
          return;
        }
        if (console.error === void 0 || console.error === null) {
          return;
        }

        console.error.apply(console, arguments);
      });
    }).bind({
      artworkElement: artworkElement,
      initialArtworkWidth: initialArtworkWidth
    }), 3000);
  }

  window.addEventListener('load', onLoad, false);

}());
