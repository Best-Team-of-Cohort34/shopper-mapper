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



  return (
    <>
    <button className="closeMap" onClick={props.mapOnOff}>
      <i class="far fa-times-circle"></i>
    </button>
  <div className="mapAndTextContainer"> 
    <div className="textContainer">
      {
        directions.map((item, index) => {
          console.log(item);
          // const middle = Math.floor(props.places.length / 2);
          // console.log(middle);
          console.log()
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
      <img src={`https://www.mapquestapi.com/staticmap/v5/map?key=A2gQgxxrU94wUIpgIn5Q6XwhGSs6sIjA&start=${props.userCoordinates[0]},${props.userCoordinates[1]}&end=${props.destCoordinates[0]},${props.destCoordinates[1]}&zoom=16&size=1000,700@2x`} className="mapDirections" alt='map images'/>
    </div>
  </div>
  </>
  );
}

export default Directions;
