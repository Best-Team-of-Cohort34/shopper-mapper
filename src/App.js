import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import Form from './Form';

function App() {
  const [coordinates, setCoordinates] = useState([]);
  const [userLocation, setUserLocation] = useState('Toronto');
  const [userCategory, setUserCategory] = useState('coffee shops');
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
        key: '0GC7xtayS34G212Wj5J2TyiN11A1jK5G',
        location: userLocation,
      },
    }).then((response) => {
      const data = response.data.results[0].locations;
      const newArr = [data[0].latLng.lng, data[0].latLng.lat];
      console.log("setting Coordinates state")
      console.log(newArr);
      setCoordinates(newArr);

    });
  }, [userLocation]);
  

 

  useEffect(() => {
    console.log("coordinates state value before initializing location and circle in placeapi useeffect")
    console.log(coordinates);
   
    if (coordinates.length > 0) {
      
      const locationArr = `${coordinates[0]},${coordinates[1]}`;
      const locationCircArr = `${coordinates[0]}, ${coordinates[1]}, 1000`;
      console.log("values of locationArr and locationCircArr in place api useeffect");
      console.log(locationArr);
      console.log(locationCircArr);
      
      axios({
        url: placeSearch,
        method: 'GET',
        dataResponse: 'json',
        params: {
         
          location: locationArr,
          sort: 'relevance',
          key: '0GC7xtayS34G212Wj5J2TyiN11A1jK5G',
          circle: locationCircArr,
          pageSize: 30,
          q: userCategory
        },
      }).then((response) => {
        
        console.log(response);
        setPlaces(response.data.results);
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
