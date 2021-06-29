import { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios';

const placeSearch = 'https://www.mapquestapi.com/search/v4/place';

const Form = (props) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [userCategoryForm, setUserCategoryForm] = useState('restaurant');
  const [locationCircArr, setlocationCircArr] = useState(
    '-79.397947, 43.648434, 1000'
  );

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
    setlocationCircArr(props.coordinates);
  };
  const storedUserInput = (event) => {
    event.preventDefault();
    location = userPrompt;
    category = userCategoryForm;

    props.receivedUserInput(location);
    props.receivedUserCategory(category);
    console.log(category + ' in the form state variable');
    console.log(location + ' in form');
  };
  console.log(props.coordinates);
  // setlocationCircArr(props.coordinates);
  // console.log(locationCircArr);

  useEffect(() => {
    axios({
      url: placeSearch,
      method: 'GET',
      dataResponse: 'json',
      params: {
        circle: locationCircArr,
        // circle: props.coordinates,
        pageSize: 20,
        key: '0GC7xtayS34G212Wj5J2TyiN11A1jK5G',
        sort: 'relevance',
        q: userCategoryForm,
        // results: { countryCode: '+1' },
      },
    }).then((response) => {
      console.log(response);
    });
  }, [userCategoryForm][locationCircArr]);

  return (
    <>
    <header className="formHeader">
      <div className="logo">
        <i className="fas fa-map-marked-alt"></i>
        <p>shopper <span>mapper</span></p>
      </div>
      <div className="descriptionAndFormContainer">
        <div className="description">
          <h1>Type in your current address and choose a category of place you would like to go. We'll return suggestions for every instance of that category within a 10km radius from your location!</h1>
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
          <label htmlFor="category" className="sr-only">Choose the category of the place you would like to go</label>
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
    <Map
    className="leaflet-container"
    center={[43.648210, -79.397860]}
    zoom={10}>
      <TileLayer
        url={
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        }
      />
    </Map>
    </>
  );
};

export default Form;
