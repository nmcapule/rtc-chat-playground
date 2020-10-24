<script lang="ts">
  import L from 'leaflet';
  import { onMount } from 'svelte';
  import { GREETINGS } from './greetings';

  import CustomPopup from './CustomPopup.svelte';

  let time = new Date();
  let map: L.Map;

  onMount(() => {
    const interval = setInterval(generatePopup, 400);
    return () => clearInterval(interval);
  });

  const messages = GREETINGS;
  function generatePopup() {
    if (map) {
      const popup = L.popup({
        closeButton: false,
        autoClose: false,
        autoPan: false,
        className: 'custom-leaflet-popup',
      });

      const lat = Math.random() * 180 - 90;
      const lng = Math.random() * 360 - 180;

      popup.setLatLng([lat, lng]);
      const popupDOM = L.DomUtil.create('div');
      popup.setContent(popupDOM);
      popup.openOn(map);

      const popupComponent = new CustomPopup({
        target: popup.getElement(),
      });
      // Bit of a hack, since it's not working in the initializer.
      popupComponent.$set({
        message: messages[Math.floor(Math.random() * messages.length)],
      });

      setTimeout(() => {
        map?.closePopup(popup);
        popupComponent.$destroy();
        L.DomUtil.remove(popupDOM);
      }, 1000 + Math.random() * 5000);
    }
  }

  function createMap(container: HTMLElement) {
    const created = L.map(container, { preferCanvas: true }).setView([30, 0], 2);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: `
      &copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
	    &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
      subdomains: 'abcd',
      maxZoom: 14,
      minZoom: 2,
    }).addTo(created);
    return created;
  }
  function actionMap(container: HTMLElement) {
    map = createMap(container);
    return {
      destroy: () => {
        map.remove();
        map = null;
      },
    };
  }
  function resizeMap() {
    map?.invalidateSize();
  }
</script>

<style lang="scss">
  .map-container {
    height: 100%;
    width: 100%;
  }
</style>

<svelte:window on:resize={resizeMap} />
<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin="" />
  <!-- Ensures that popup is fully stylable. -->
  <style>
    .custom-leaflet-popup > .leaflet-popup-content-wrapper {
      background-color: rgba(0, 0, 0, 0);
      box-shadow: none;
    }
    .custom-leaflet-popup > .leaflet-popup-tip-container > .leaflet-popup-tip {
      display: none;
    }
  </style>
</svelte:head>

<div class="map-container" use:actionMap>Leaflet placeholder</div>
