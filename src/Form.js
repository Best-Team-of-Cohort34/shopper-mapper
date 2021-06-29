import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Form = (props) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [userCategoryForm, setUserCategoryForm] = useState('');

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
    {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
    </Marker>
    </MapContainer> */}
    {/* <div id="mapid"></div> */}
    <Map 
      center={[this.state.lat, this.state.lng]} 
      zoom={this.state.zoom} 
      style={{ width: '100%', height: '900px'}}
    >
    <TileLayer
      attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    </Map>
    </>
  );
};

export default Form;
