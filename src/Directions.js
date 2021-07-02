import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Directions(props) {
  const [directions, setDirections] = useState([]);
  const directionsApi = 'http://www.mapquestapi.com/directions/v2/route';

  console.log(props.userCoordinates);
  // console.log(props.destCoordinates);
  useEffect(() => {
    axios({
      url: directionsApi,
      method: 'GET',
      dataResponse: 'json',
      params: {
        key: '0GC7xtayS34G212Wj5J2TyiN11A1jK5G',
        from: `${props.userCoordinates[0]},${props.userCoordinates[1]}`,
        to: `${props.destCoordinates[0]},${props.destCoordinates[1]}`,
      },
    }).then((res) => {
      console.log(res);
    });
  });

  // const directionsApi = 'https://www.mapquestapi.com/staticmap/v5/map';
  // const [mapImg, setMapImg] = useState("https://i.pinimg.com/originals/a4/f8/f9/a4f8f91b31d2c63a015ed34ae8c13bbd.jpg");

  // console.log(props.userCoordinates);
  // console.log(props.destCoordinates);
  // useEffect(() => {
  //   axios({
  //     url: directionsApi,
  //     method: 'GET',
  //     dataResponse: 'json',
  //     responseType: 'image',
  //     // responseType: 'blob',
  //     params: {
  //       key: '0GC7xtayS34G212Wj5J2TyiN11A1jK5G',
  //       start: `${props.userCoordinates[0]},${props.userCoordinates[1]}`,
  //       end: `${props.destCoordinates[0]},${props.destCoordinates[1]}`,
  //       // size: `1100,500@2x`
  //       zoom: 12,
  //     },
  //   }).then((data) => {
  //     console.log(data.data);
  //     // setMapImg(data.data);
  //   })

  // },[]);

  return (
    <div>
      <div className="textContainer">
        <h3>Directions!!!</h3>
        <p>narrative</p>
      </div>
      <div className="leaflet-container">
        <img
          src={`https://www.mapquestapi.com/staticmap/v5/map?key=0GC7xtayS34G212Wj5J2TyiN11A1jK5G&start=${props.userCoordinates[0]},${props.userCoordinates[1]}&end=${props.destCoordinates[0]},${props.destCoordinates[1]}&zoom=15&size=500,400@2x`}
        />
      </div>
    </div>
  );
}

export default Directions;
