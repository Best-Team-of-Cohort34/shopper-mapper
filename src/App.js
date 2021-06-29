import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import Form from './Form';

function App() {
  const [coordinates, setCoordinates] = useState([]);
  const [userLocation, setUserLocation] = useState(
    '483 Queen St W 3rd floor, Toronto, ON M5V 2A9'
  );
  const [userCategory, setUserCategory] = useState('');

  const geoCode = 'http://www.mapquestapi.com/geocoding/v1/address';
  const searchApi = 'http://www.mapquestapi.com/search/v2/search';
  const placeSearch = 'https://www.mapquestapi.com/search/v4/place';

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
      // console.log(response.data.results);
      const data = response.data.results[0].locations;
      const newArr = [...data];
      newArr.forEach((item) => {
        console.log(item.latLng);
        setCoordinates(item.latLng);
      });
    });
  }, [userLocation]);
  const locationArr = [coordinates.lng, coordinates.lat];
  const locationCircArr = [coordinates.lng, coordinates.lat, 1000];
  console.log(locationArr);
  console.log(locationCircArr);

  useEffect(() => {
    axios({
      url: placeSearch,
      method: 'GET',
      dataResponse: 'json',
      params: {
        sort: 'relevance',
        key: '0GC7xtayS34G212Wj5J2TyiN11A1jK5G',
        circle: locationCircArr,
        q: 'bars',
        location: locationArr,
      },
    }).then((response) => {
      console.log(response);
    });
  }, [coordinates]);

  return (
    <div className="App">
      <h1>HELLO WORLD!</h1>
      <Form
        receivedUserInput={receivedUserInput}
        receivedUserCategory={receivedUserCategory}
      />
    </div>
  );
}

export default App;
