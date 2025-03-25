let map = L.map("map").setView([35.6892, 51.389], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

let markers = [];

map.on("click", function (e) {
  addMarker(e.latlng.lat, e.latlng.lng);
});

function addMarker(lat, lng) {
  let marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(
    `<div class="text-center">
            <p class="text-sm">Coordinates: ${lat.toFixed(6)}, ${lng.toFixed(
      6
    )}</p>
            <button onclick="removeMarker(${lat}, ${lng})" class="mt-2 px-2 py-1 bg-red-600 text-white text-xs rounded">Delete Marker</button>
        </div>`
  );
  markers.push({ lat, lng });
}

function removeMarker(lat, lng) {
  markers = markers.filter((m) => m.lat !== lat || m.lng !== lng);
  map.eachLayer((layer) => {
    if (
      layer instanceof L.Marker &&
      layer.getLatLng().lat === lat &&
      layer.getLatLng().lng === lng
    ) {
      map.removeLayer(layer);
    }
  });
}

document.getElementById("addMarkerBtn").addEventListener("click", function () {
  let lat = parseFloat(document.getElementById("lat").value);
  let lng = parseFloat(document.getElementById("lng").value);
  if (!isNaN(lat) && !isNaN(lng)) {
    addMarker(lat, lng);
  }
});
