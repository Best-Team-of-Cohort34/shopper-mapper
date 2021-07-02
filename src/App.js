import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import Form from './Form';

function App() {
  // getting coordinates from users input location
  const [coordinates, setCoordinates] = useState([]);
  // getting the value of users locations, set to default value
  const [userLocation, setUserLocation] = useState('Toronto');
  // getting the value of the category selected by user, set to default value
  const [userCategory, setUserCategory] = useState('coffee shops');
  // list of places/results for the specified category 
  const [places, setPlaces] = useState([]);

  const geoCode = 'https://www.mapquestapi.com/geocoding/v1/address';
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
        key: 'A2gQgxxrU94wUIpgIn5Q6XwhGSs6sIjA',
        location: userLocation,
      },
    }).then((response) => {
      const data = response.data.results[0].locations;
      const newArr = [data[0].latLng.lng, data[0].latLng.lat];
      setCoordinates(newArr);
    }).catch((err) => {
        console.log('error occured!!!', `${err}`);
      });
  }, [userLocation]);
  

  useEffect(() => {
    if (coordinates.length > 0) {
      // if the coordinates state is not set, the axios call would throw an error
      const locationArr = `${coordinates[0]},${coordinates[1]}`;
      const locationCircArr = `${coordinates[0]}, ${coordinates[1]}, 1000`;

      axios({
        url: placeSearch,
        method: 'GET',
        dataResponse: 'json',
        params: {
          location: locationArr,
          sort: 'relevance',
          key: 'A2gQgxxrU94wUIpgIn5Q6XwhGSs6sIjA',
          circle: locationCircArr,
          pageSize: 30,
          q: userCategory,
        },
      }).then((response) => {
        setPlaces(response.data.results);
      }).catch((err) => {
        console.log('error occured!!!', `${err}`);
      });
    }
  }, [coordinates, userCategory]);

  return (
    <div className="App">
      <Form
        receivedUserInput={receivedUserInput}
        receivedUserCategory={receivedUserCategory}
        places={[...places]}
        coordinates={[...coordinates]}
      />
    </div>
  );
}

export default App;
