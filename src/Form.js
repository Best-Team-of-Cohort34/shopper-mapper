import { useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import Directions from "./Directions";
const Form = (props) => {
  const [userPrompt, setUserPrompt] = useState("");
  const [userCategoryForm, setUserCategoryForm] = useState("restaurant");
  const [submitted, setSubmitted] = useState(false);
  const [clickMarker, setClickMarker] = useState(false);
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
    location = userPrompt;
    setSubmitted(true);
    category = userCategoryForm;
    props.receivedUserInput(location);
    props.receivedUserCategory(category);
  };

  const test = (destArray) => {
    console.log('clicked');
    setClickMarker(true);
    setDestCoordinates(destArray);
    console.log(clickMarker);
  };
  const mapOnOff = (event) => {
    event.preventDefault();
    setSubmitted(false);
  }

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
                <option value="groceries">Grocery Stores</option>
                <option value="pharmacies">Pharmacies</option>
                <option value="coffee-shops">Coffee Shops</option>
                <option value="bakery">Bakeries</option>
                <option value="restaurants">Restaurants</option>
                <option value="bars">Bars & Pubs</option>
              </select>
              <button className="formButton" onClick={storedUserInput}>
                Take me there!
              </button>
            </form>
          </div>

        </header>
      </>
    );
  } else if (submitted) {
    // console.log([props.coordinates[1], props.coordinates[0]]);

    if (clickMarker) {
      return (
        <header className="formHeader">
          <div className="logo">
            <i className="fas fa-map-marked-alt"></i>
            <p>
              shopper <span>mapper</span>
            </p>
            <div className="mapAndTextContainer">

              <Directions
                userCoordinates={[props.coordinates[1], props.coordinates[0]]}
                destCoordinates={[...destCoordinates]}
                // placeCoordinates={[
                //   props.places.geometry.coordinates[1],
                //   props.places.geometry.coordinates[0],
                // ]}
              />

              
            </div>
          </div>
        </header>
      );
              {/* <div className="textContainer">
                {
                props.places.map((item, index) => {
                  console.log(props.places);
                  const middle = Math.floor(props.places.length / 2);
                  console.log(middle);
                return (
                  // ternary in h3, 
                  // that says item.name ? middlePlace : 
                  <ol>
                    <li key={item.id}>
                      <h3 
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
              <Directions
                  userCoordinates={[props.coordinates[1], props.coordinates[0]]}
                  destCoordinates={[...destCoordinates]}
                  // placeCoordinates={[
                  //   props.places.geometry.coordinates[1],
                  //   props.places.geometry.coordinates[0],
                  // ]}
                />
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
                {props.places.map((item) => {
                  // console.log(item);
                  // console.log(props.coordinates[0]);
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
                        <h3>{item.name}</h3>
                      <p className="popupText">{item.place.properties.street}, <span className="city">{item.place.properties.city},</span> <span className="province">{item.place.properties.stateCode}</span></p>
                        <button className="popupButton" onClick={() => test([item.place.geometry.coordinates[1],item.place.geometry.coordinates[0]])}>
                          click here for directions
                        </button>
                      </Popup>
                    </Marker>
                  );
                })}
              </Map>
              {/* <Directions /> */}
    } else {
      return (
        <header className="formHeader">
          <div className="logo">
            <i className="fas fa-map-marked-alt"></i>
            <p>
              shopper <span>mapper</span>
            </p>
            <div>
              <button onClick={mapOnOff}>
              <i class="far fa-times-circle"></i>
              </button>
            </div>
            <div className="mapAndTextContainer">
              <div className="textContainer">
                {
                props.places.map((item, index) => {
                  console.log(props.places);
                  const middle = Math.floor(props.places.length / 2);
                  console.log(middle);
                return (
                  // ternary in h3,
                  // that says item.name ? middlePlace :
                  <ol>
                    <li key={item.id}>
                      <h3 
                      style={index === middle ? 
                        {background: "#ff9d7f"} : 
                        {background: "transparent"}}
                      
                        >
                        {item.name}</h3>

                      <p>
                        {item.place.properties.street},{" "}
                        <span className="city">
                          {item.place.properties.city},
                        </span>{" "}
                        <span className="province">
                          {item.place.properties.stateCode}
                        </span>
                      </p>
                    </li>
                  </ol>
                );
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
                {props.places.map((item) => {
                  // console.log(item);
                  // console.log(props.coordinates[0]);
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
              {/* <Directions /> */}
            </div>
          </div>
        </header>
      );
    }
  }
  // if (clickMarker) {
  //   return (
  //     <div className="textContainer">
  //       <Directions />
  //     </div>
  //   );
  // }
  // else if (clickMarker) {
  //   return <Directions />;
  // }
};

export default Form;
