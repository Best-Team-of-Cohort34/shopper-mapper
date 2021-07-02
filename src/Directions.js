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
        key: 'A2gQgxxrU94wUIpgIn5Q6XwhGSs6sIjA',
        from: `${props.userCoordinates[0]},${props.userCoordinates[1]}`,
        to: `${props.destCoordinates[0]},${props.destCoordinates[1]}`,
      },
    }).then((res) => {
      console.log(res);
      setDirections(res.data.route.legs[0].maneuvers);
      console.log(directions);
    });
  }, []);

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
    <div className="mapAndTextContainer">
      <div className="textContainer">
        {directions.map((item, index) => {
          console.log(item);
          // const middle = Math.floor(props.places.length / 2);
          // console.log(middle);
          console.log();
          return (
            <>
              <ol>
                <li key={index}>
                  <img
                    className="icons"
                    src={item.iconUrl}
                    alt="direction icon"
                  />
                  <p>{item.narrative}</p>
                </li>
              </ol>
            </>
          );
        })}
      </div>
      <div className="leaflet-container">
        <img
          src={`https://www.mapquestapi.com/staticmap/v5/map?key=A2gQgxxrU94wUIpgIn5Q6XwhGSs6sIjA&start=${props.userCoordinates[0]},${props.userCoordinates[1]}&end=${props.destCoordinates[0]},${props.destCoordinates[1]}&zoom=15&size=500,400@2x`}
          className="mapDirections"
        />
      </div>
    </div>
  );
}

export default Directions;
