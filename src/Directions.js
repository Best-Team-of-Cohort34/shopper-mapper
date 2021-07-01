import axios from 'axios';
import { useEffect, useState } from 'react';

const directionsApi = 'https://www.mapquestapi.com/directions/v2/route';

function Directions() {
  const [directions, setDirections] = useState([]);

  // useEffect(() => {
  //   axios({
  //     url: directionsApi,
  //     method: 'GET',
  //     dataResponse: 'json',
  //     params: {
  //       key: '0GC7xtayS34G212Wj5J2TyiN11A1jK5G',
  //       from: 'user address coordinates',
  //       to: 'places coordinates',
  //     },
  //   }).then((res) => {
  //     console.log(res);
  //   });
  // });

  return <h3>Directions!!!</h3>;
}

export default Directions;
