//const socket = io("http://localhost:3000/socket");
const socket = io("http://wikiredes.socialpressplugin.xyz:3000/socket");
let map;
var markers = [];
var markersData = [];

socket.on("alert:web", data => {
  setMarkert(data);
});

function setMarkert(dataAlerta) {
  console.log("markersData 1: ", markersData);
  console.log(
    `${dataAlerta.usuario.nombres} ${dataAlerta.usuario.apellidos} nose años`
  );
  let isNew = true;
  markersData.map((alerta, index) => {
    if (alerta.usuario._id === dataAlerta.usuario._id) {
      markers[index].setPosition({
        lat: dataAlerta.locacion.latitud,
        lng: dataAlerta.locacion.longitud
      });
      isNew = false;
    }
  });

  if (isNew) {
    console.log("Agregando:", dataAlerta.usuario._id);
    markers.push(
      new google.maps.Marker({
        position: {
          lat: dataAlerta.locacion.latitud,
          lng: dataAlerta.locacion.longitud
        },
        title: `${dataAlerta.usuario.nombres} ${
          dataAlerta.usuario.apellidos
        } nose años`,
        map: map,
        animation: google.maps.Animation.DROP
      })
    );
    markersData.push(dataAlerta);
  }
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function initMap() {
  var myLatLng = {
    lat: -6.7756065,
    lng: -79.8369502
  };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: myLatLng
  });
}

function newLocation() {
  socket.emit("alert:new", {
    _id: "2020029139md19d",
    ubicacionInicialLatitud: " -6.7755507",
    ubicacionInicialLongitud: "-79.8419147",
    creadoEn: "2018-12-01T05:28:20.422Z",
    usuario: {
      _id: "5bf9cb5bea98d41cc7447f83",
      tipo: "victima",
      nombres: "Maria",
      apellidos: "Ramos",
      fechaNacimiento: "1997-03-18T17:00:00.000Z"
    }
  });
}

function updateLocation() {
  socket.emit("alert:updated", {
    _id: "5c0228a454952138aab8b41a",
    ubicacionInicialLatitud: " -6.7755507",
    ubicacionInicialLongitud: "-79.8419147",
    creadoEn: "2018-12-01T05:28:20.422Z",
    usuario: {
      _id: "5bfb193c245d310c2c0752ef",
      tipo: "victima",
      nombres: "Josefa",
      apellidos: "Cortegana",
      fechaNacimiento: "1997-03-18T17:00:00.000Z"
    }
  });
}

function emitirAtencion() {
  socket.emit("alert:atencion", {
    _id: "5c0279fe0e40fd7928112b85",
    ubicacionInicialLatitud: " -6.7755507",
    ubicacionInicialLongitud: "-79.8419147",
    creadoEn: "2018-12-01T05:28:20.422Z",
    usuario: {
      _id: "5bfb193c245d310c2c0752ef",
      tipo: "victima",
      nombres: "Josefa",
      apellidos: "Cortegana",
      fechaNacimiento: "1997-03-18T17:00:00.000Z"
    }
  });
}
