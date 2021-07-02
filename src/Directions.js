import axios from 'axios';
import { useEffect, useState } from 'react';

function Directions(props) {
  // getting the route from point A to point B
  const [directions, setDirections] = useState([]);

  const directionsApi = 'https://www.mapquestapi.com/directions/v2/route';

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
      setDirections(res.data.route.legs[0].maneuvers);
      // error handling
    }).catch((err) => {
        console.log('error occured!!!', `${err}`);
      });
  }, [props.userCoordinates, props.destCoordinates]);

  return (
    <>
    <button className="closeMap" onClick={props.mapOnOff}>
      <i className="far fa-times-circle"></i>
    </button>
    <div className="mapAndTextContainer"> 
      <div className="textContainer">
        {
          directions.map((item, index) => {
          return (
            <>
              <ol>
                <li key={index}>
                  <img className="icons" src={item.iconUrl} alt="direction icon"/>
                  <p>{item.narrative}</p>
                </li>
              </ol>
            </>
          )
      })}
    </div>
    <div className="leaflet-container flex-leaflet-container">
      <img src={`https://www.mapquestapi.com/staticmap/v5/map?key=A2gQgxxrU94wUIpgIn5Q6XwhGSs6sIjA&start=${props.userCoordinates[0]},${props.userCoordinates[1]}&end=${props.destCoordinates[0]},${props.destCoordinates[1]}&zoom=15&size=1000,700@2x`} alt="directions map" className="mapDirections"/>
    </div>
  </div>
  </>
  );
}

export default Directions;
