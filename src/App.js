import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import Form from './Form';

const geoCode = 'http://www.mapquestapi.com/geocoding/v1/address';

function App() {
  const [coordinates, setCoordinates] = useState({});
  const [userLocation, setUserLocation] = useState(
    '483 Queen St W 3rd floor, Toronto, ON M5V 2A9'
  );

  const [userCategory, setUserCategory] = useState('restaurant');
  const [locationCircArr, setLocationCircArr] = useState([]);

  const receivedUserInput = (loc) => {
    setUserLocation(loc);
  };
  const receivedUserCategory = (cat) => {
    setUserCategory(cat);
  };

  useEffect(() => {
    axios({
      url: geoCode,
      method: 'GET',
      dataResponse: 'json',
      params: {
        key: '0GC7xtayS34G212Wj5J2TyiN11A1jK5G',
        location: userLocation,
      },
    }).then((response) => {
      setCoordinates(response.data.results[0].locations[0].latLng);
    });
  }, [userLocation]);
  console.log(coordinates);
  // console.log(typeof coordinates);
  // const newArr = [...coordinates];
  // console.log(newArr);
  // console.log(coordinates);
  // console.log(locationArr);
  // console.log(locationCirArr);
  // const locationArr = [coordinates.lng, coordinates.lat];
  // const locationCircArr = [coordinates.lng, coordinates.lat, 1000];
  // console.log(locationArr);
  // console.log(locationCircArr);

  // useEffect(() => {

  //     axios({
  //       url: placeSearch,
  //     method: 'GET',
  //     dataResponse: 'json',
  //     params: {
  //       sort: 'relevance',
  //       key: '0GC7xtayS34G212Wj5J2TyiN11A1jK5G',
  //       circle: locationCircArr,
  //       q: userCategory,
  //       location: locationArr,
  //     },
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // }, [coordinates,locationArr]);

  return (
    <div className="App">
      {/* <h1>HELLO WORLD!</h1> */}
      <Form
        receivedUserInput={receivedUserInput}
        receivedUserCategory={receivedUserCategory}
        circCoordinates={`${coordinates.lng}, ${coordinates.lat}, 1000`}
        coordinates={[coordinates.lat, coordinates.lng]}
      />
    </div>
  );
}

export default App;
