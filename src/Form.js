import { useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Directions from './Directions';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

const Form = (props) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [userCategoryForm, setUserCategoryForm] = useState('restaurant');
  const [submitted, setSubmitted] = useState(false);
  const [clickMarker, setClickMarker] = useState(false);

  let location = '';
  let category = '';

  const userInput = (event) => {
    setUserPrompt(event.target.value);
  };
  const handleSelection = (event) => {
    event.preventDefault();
    setUserCategoryForm(event.target.value);
    // setlocationCircArr(props.circCoordinates);
  };
  const storedUserInput = (event) => {
    event.preventDefault();
    location = userPrompt;
    setSubmitted(true);
    category = userCategoryForm;
    props.receivedUserInput(location);
    props.receivedUserCategory(category);
  };

  const test = () => {
    console.log('clicked');
    setClickMarker(true);
    console.log(clickMarker);
  };

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
                <option value="coffee shops">Coffee shops</option>
                <option value="restaurants">Restaurants</option>
              </select>
              <button className="formButton" onClick={storedUserInput}>
                Take me there!
              </button>
              {/* <button type="submit">Submit✨</button> */}
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
              <div className="textContainer">
                {props.places.forEach((item) => {
                  console.log(item.place.geometry.coordinates);
                })}
                <Directions
                  userCoordinates={[props.coordinates[1], props.coordinates[0]]}
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
                        <button onClick={() => test()}>
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
    } else {
      return (
        <header className="formHeader">
          <div className="logo">
            <i className="fas fa-map-marked-alt"></i>
            <p>
              shopper <span>mapper</span>
            </p>
            <div className="mapAndTextContainer">
              <div className="textContainer">
                <h3>Title of Location</h3>
                <p>address skdhoeih qlieheotih</p>
                <p>duration</p>
                <h3>Title of Location</h3>
                <p>address skdhoeih qlieheotih</p>
                <p>duration</p>
                <h3>Title of Location</h3>
                <p>address skdhoeih qlieheotih</p>
                <p>duration</p>
                <h3>Title of Location</h3>
                <p>address skdhoeih qlieheotih</p>
                <p>duration</p>
                <h3>Title of Location</h3>
                <p>address skdhoeih qlieheotih</p>
                <p>duration</p>
                <h3>Title of Location</h3>
                <p>address skdhoeih qlieheotih</p>
                <p>duration</p>
                <h3>Title of Location</h3>
                <p>address skdhoeih qlieheotih</p>
                <p>duration</p>
                <h3>Title of Location</h3>
                <p>address skdhoeih qlieheotih</p>
                <p>duration</p>
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
                        <button onClick={() => test()}>
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

{
  /* // 5 Glen Cameron Rd Thornhill, ON
// 251 jarvis street toronto */
}
