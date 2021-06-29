import { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const placeSearch = 'https://www.mapquestapi.com/search/v4/place';

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });
// const icon = L.Icon({ 
//   iconUrl: require('../node_modules/leaflet/dist/images/marker-icon.png'),
//   iconSize: [30, 42],
//   iconAnchor: [15, 42]
// });



const Form = (props) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [userCategoryForm, setUserCategoryForm] = useState('restaurant');
  const [locationCircArr, setlocationCircArr] = useState(
    '-79.397947, 43.648434, 1000'
  );
  // const [locationArr, setLocationArr] = useState('43.648434, -79.397947');
  const [places, setPlaces] = useState([]);
  const [submitted, SetSubmitted] = useState(false);

  // const [places, setPlaces] = useState([]);
  // const places = response.data.results;

  let location = '';
  let category = '';

  // useEffect(() => {
  //   console.log("inside empty useEffect")
  // }, [userCategoryForm])

  const userInput = (event) => {
    setUserPrompt(event.target.value);
    // console.log(event.target.value);
    // console.log(userLocation)
  };
  const handleSelection = (event) => {
    event.preventDefault();
    setUserCategoryForm(event.target.value);
    setlocationCircArr(props.circCoordinates);
  };
  const storedUserInput = (event) => {
    event.preventDefault();
    location = userPrompt;
    category = userCategoryForm;
    SetSubmitted(true);
    // setLocationArr(props.coordinates);
    props.receivedUserInput(location);
    props.receivedUserCategory(category);
    console.log(category + ' in the form state variable');
    console.log(location + ' in form');
  };
  // setlocationCircArr(props.coordinates);
  // console.log(locationCircArr);

  useEffect(() => {
    axios({
      url: placeSearch,
      method: "GET",
      dataResponse: "json",
      params: {
        circle: locationCircArr,
        pageSize: 20,
        key: "0GC7xtayS34G212Wj5J2TyiN11A1jK5G",
        sort: "relevance",
        q: userCategoryForm,
      },
    }).then((response) => {
      console.log(response);
      // setPlaces(response.data.results)
      // const places = response.data.results;
      // console.log(response.data.results);
      setPlaces(response.data.results);
    });
  }, [submitted, userCategoryForm]);

  // console.log(props.coordinates);

  // rendering pages
  if (!submitted) {
    return (
      <>
        <header className="formHeader">
          <div className="logo">
            <i className="fas fa-map-marked-alt"></i>
            <p>
              shopper <span>mapper</span>
            </p>
          </div>
          <div className="descriptionAndFormContainer">
            <div className="description">
              <h1>
                Type in your current address and choose a category of place you
                would like to go. We'll return suggestions for every instance of
                that category within a 10km radius from your location!
              </h1>
            </div>
            <form action="submit">
              <label htmlFor="userInput" className="sr-only">
                Enter your address
              </label>
              <input
                type="text"
                id="userInput"
                required
                placeholder="Enter your address"
                onChange={userInput}
                value={userPrompt}
              />
              <label htmlFor="category" className="sr-only">
                Choose the category of the place you would like to go
              </label>
              <select
                onChange={handleSelection}
                name="category"
                id="category"
                defaultValue=""
              >
                <option value="" disabled>
                  Where do you want to go?{' '}
                </option>
                <option value="coffee shops">coffee shops</option>
                <option value="restaurants">restaurants</option>
              </select>
              <button className="formButton" onClick={storedUserInput}>
                {/* {userPrompt === '' ? 'Loading...' : 'Search'} */}
                Take me there!
              </button>
              {/* <button type="submit">Submit✨</button> */}
            </form>
          </div>
        </header>
      </>
    );
  } else {
    return (
      <header className="formHeader">
        <div className="logo">
          <i className="fas fa-map-marked-alt"></i>
          <p>
            shopper <span>mapper</span>
          </p>


          <Map
            className="leaflet-container"
            center={[props.coordinates[0], props.coordinates[1]]}
            zoom={10}
          >
            <TileLayer
              url={
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
              }
            />
            {places.map((item) => {
              console.log(item);
              // console.log(item.id);
              // console.log(
              //   item.place.geometry.coordinates[0],
              //   item.place.geometry.coordinates[1]
              // );
              return (
                <Marker
                  key={item.id}
                  position={[
                    item.place.geometry.coordinates[1],
                    item.place.geometry.coordinates[0],
                  ]}
                  src="./map-marker-icon.png"
              >
                <Popup>
                  <h3>This is where you are</h3>
                </Popup>
              </Marker>
              )
            })}
          </Map>
        </div>
      </header>
    );
  }
};

export default Form;
