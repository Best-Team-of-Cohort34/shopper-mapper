import axios from 'axios';
import './App.css';
import {useState, useEffect} from 'react';
import Form from './Form';

function App() {

const [location, setLocation] = useState([]);
const [formSubmit, setFormSubmit] =useState(false);

const searchAhead = "http://www.mapquestapi.com/search/v3/prediction";

const geoCode = "http://www.mapquestapi.com/geocoding/v1/address";

const searchApi = "http://www.mapquestapi.com/search/v2/search";


// const placeSearch = "https://api3";
// const requestOne = axios.get(one);
// const requestTwo = axios.get(two);
// const requestThree = axios.get(three);
// axios
//   .all([requestOne, requestTwo, requestThree])
//   .then(
//     axios.spread((...responses) => {
//       const responseOne = responses[0];
//       const responseTwo = responses[1];
//       const responesThree = responses[2];
//       // use/access the results
//       console.log("responseOne", responseOne);
//       console.log("responseTwo", responseTwo);
//       console.log("responesThree", responesThree);
//     })
//   )
//   .catch((errors) => {
//     console.log(errors);
//   });


// useEffect(() => {
//   axios({
//   url: searchAhead,
//   method: "GET",
//   dataResponse: "json",
//   params: {
//     key: "0GC7xtayS34G212Wj5J2TyiN11A1jK5G",
//     // q: ,
//     // collection: ,
//   },

//   }).then((response) => {
//     console.log(response);
//     setLocation(response.data.results);
//   });
// }, []);

useEffect(() => {
  axios({
    url: geoCode,
    method: "GET",
    dataResponse: "json",
    params: {
      key: "0GC7xtayS34G212Wj5J2TyiN11A1jK5G",
    },
  }).then((response) => {
    console.log(response);
    setLocation(response.data.results);
  });
}, []);

useEffect(() => {
  axios({
  url: searchApi,
  method: "GET",
  dataResponse: "json",
  params: {
    key: "0GC7xtayS34G212Wj5J2TyiN11A1jK5G",
    // q: ,
    // collection: ,
  },

  }).then((response) => {
    console.log(response);
    setLocation(response.data.results);
  });
}, []);


return (
  <div className="App">
    <h1>HELLO WORLD!</h1>
    <Form />
  </div>
);
 
}


export default App;
