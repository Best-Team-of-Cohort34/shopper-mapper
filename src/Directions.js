import axios from 'axios';
import { useEffect, useState } from 'react';

function Directions(props) {
  // const [directions, setDirections] = useState([]);
  const directionsApi = 'http://www.mapquestapi.com/directions/v2/route';

  console.log(props.userCoordinates);
  console.log(props.destCoordinates);
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



  return <h3>Directions!!!</h3>;
}

export default Directions;
