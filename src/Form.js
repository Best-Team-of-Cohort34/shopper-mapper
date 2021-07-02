import { useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import Directions from "./Directions";
const Form = (props) => {
  // user location input 
  const [userPrompt, setUserPrompt] = useState('');
  // user category input, set to default value
  const [userCategoryForm, setUserCategoryForm] = useState('restaurant');
  // on submit state/click
  const [submitted, setSubmitted] = useState(false);
  // map marker click state
  const [clickMarker, setClickMarker] = useState(false);
  // setting the value of the coordinates for the destination selected by user
  const [destCoordinates, setDestCoordinates] = useState([]);
  let location = '';
  let category = '';

  const userInput = (event) => {
    setUserPrompt(event.target.value);
  };

  const handleSelection = (event) => {
    event.preventDefault();
    setUserCategoryForm(event.target.value);
  };

  const storedUserInput = (event) => {
    event.preventDefault();
    if (userPrompt === '') {
      // error handling
      alert('please enter address');
    } else {
      location = userPrompt;
      setSubmitted(true);
      category = userCategoryForm;
      props.receivedUserInput(location);
      props.receivedUserCategory(category);
    }
  };

  // function that is called when the marker is clicked
  const test = (destArray) => {
    setClickMarker(true);
    setDestCoordinates(destArray);
  };

  // toggling the state of the X button on the map
  // resetting the state of the marker click to false
  // error handling
  const mapOnOff = (event) => {
    event.preventDefault();
    setSubmitted(false);
    setClickMarker(false);
  }

  // rendering pages

  // if submitted = false, only render the header (without displaying the map)
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
                that category within 10km radius from your
                location!
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
                  Where do you want to go?{" "}
                </option>
                <option value="groceries">🛒 Grocery Stores</option>
                <option value="pharmacies">💊 Pharmacies</option>
                <option value="coffee-shops">☕️ Coffee Shops</option>
                <option value="bakery">🥐 Bakeries</option>
                <option value="restaurants">🍔 Restaurants</option>
                <option value="bars">🍺 Bars & Pubs</option>
              </select>
              <button className="formButton" onClick={storedUserInput}>
                Show me places!
              </button>
            </form>
          </div>

        </header>
      </>
    );
    // if submitted = true AND the user has clicked the marker on the map
  } else if (submitted) {
    if (clickMarker) {
      return (
        <header className="formHeader">
          <div className="logo">
            <i className="fas fa-map-marked-alt"></i>
            <p>
              shopper <span>mapper</span>
            </p>
          </div>
            <Directions
              userCoordinates={[props.coordinates[1], props.coordinates[0]]}
              destCoordinates={[...destCoordinates]}
              mapOnOff={mapOnOff}
            />
        </header>
      );
      // if submitted = true but the user has NOT clicked on the marker on the map
    } else {
      return (
        <header className="formHeader">
          <div className="logo">
            <i className="fas fa-map-marked-alt"></i>
            <p>
              shopper <span>mapper</span>
            </p>
            <div>
              <button className="closeMap" onClick={mapOnOff}>
              <i className="far fa-times-circle"></i>
              </button>
            </div>
            <div className="mapAndTextContainer">
              <div className="textContainer">
                {
                props.places.map((item, index) => {
                  // this is the getting the middle location, as per client brief
                  const middle = Math.floor(props.places.length / 2);
                  return (
                    <ol>
                      <li key={index}>
                        <h3 
                        // highlighting middle location
                        style={index === middle ? 
                          {background: "#ff9d7f"} : 
                          {background: "transparent"}}
                          >
                          {item.name}</h3>
                        <p>{item.place.properties.street}, <span className="city">{item.place.properties.city},</span> <span className="province">{item.place.properties.stateCode}</span></p>
                      </li>
                    </ol>
                  )
                })}
                </div>
                <Map
                  className="leaflet-container"
                  center={[props.coordinates[1], props.coordinates[0]]}
                  zoom={15}
                >
                <TileLayer
                  url={
                    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
                  }
                />
                {props.places.map((item, index) => {
                  return (
                    <Marker
                      key={index}
                      position={[
                        item.place.geometry.coordinates[1],
                        item.place.geometry.coordinates[0],
                      ]}
                      src="./map-marker-icon.png"
                    >
                      
                      <Popup>
                        <h3>{item.name}</h3>
                        <p className="popupText">
                          {item.place.properties.street},{" "}
                          <span className="city">
                            {item.place.properties.city},
                          </span>{" "}
                          <span className="province">
                            {item.place.properties.stateCode}
                          </span>
                        </p>
                        <button
                          className="popupButton"
                          onClick={() =>
                            test([
                              item.place.geometry.coordinates[1],
                              item.place.geometry.coordinates[0],
                            ])
                          }
                        >
                          click here for directions
                        </button>
                      </Popup>
                    </Marker>
                  );
                })}
              </Map>
            </div>
          </div>
        </header>
      );
    }
  }
};

export default Form;
