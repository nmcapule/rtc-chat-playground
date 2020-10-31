<script lang="ts">
  import L from 'leaflet';
  import io from 'socket.io-client';
  import { onMount } from 'svelte';
  import { GREETINGS } from './greetings';

  import Chatbox from './Chatbox.svelte';
  import CustomPopup from './CustomPopup.svelte';

  let time = new Date();
  let map: L.Map;

  onMount(() => {
    const socket = io('http://localhost:3000');
    socket.emit('events', { whats: 'up moth' });
    socket.on('events', (data) => {
      console.log('reply from events:', data);
    });

    const interval = setInterval(generatePopup, 100);
    return () => clearInterval(interval);
  });

  const messages = GREETINGS;
  function generatePopup(message?: string, position?: Position) {
    if (map) {
      const popup = L.popup({
        closeButton: false,
        autoClose: false,
        autoPan: false,
        className: 'custom-leaflet-popup',
      });

      const lat = position?.coords?.latitude || Math.random() * 180 - 90;
      const lng = position?.coords?.longitude || Math.random() * 360 - 180;

      popup.setLatLng([lat, lng]);
      const popupDOM = L.DomUtil.create('div');
      popup.setContent(popupDOM);
      popup.openOn(map);

      const popupComponent = new CustomPopup({
        target: popup.getElement(),
        props: {
          message: message || messages[Math.floor(Math.random() * messages.length)],
        },
      });

      setTimeout(() => {
        map?.closePopup(popup);
        popupComponent.$destroy();
        L.DomUtil.remove(popupDOM);
      }, 1000 + Math.random() * 5000);
    }
  }

  function resetMapView(map: L.Map) {
    map?.setView([30, 0], 2);
  }
  function createMap(container: HTMLElement) {
    const created = L.map(container, {
      preferCanvas: true,
      maxBounds: new L.LatLngBounds([90, -180], [-90, 180]),
    });

    resetMapView(created);

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

  function handleLocate(event) {
    console.log(event.detail);
    generatePopup(JSON.stringify(event.detail, null, 2), event.detail);

    map?.setView([event.detail.coords.latitude, event.detail.coords.longitude], 10, {
      animate: true,
      duration: 1000,
    });

    setTimeout(() => resetMapView(map), 5000);
  }
</script>

<style lang="scss">
  .map-container {
    width: 100%;
    height: 100%;
  }
  .overlay {
    position: absolute;
    pointer-events: none;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 2000;

    > .catch-pointer {
      pointer-events: all;
    }
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

<div class="overlay row justify-content-end align-items-end">
  <div class="catch-pointer">
    <Chatbox on:locate={handleLocate} />
  </div>
</div>
<div class="map-container" use:actionMap />
