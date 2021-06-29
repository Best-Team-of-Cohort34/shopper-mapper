import { useState, useEffect } from 'react';
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
    <header>
      <form action="submit">
        <label htmlFor="userInput" className="sr-only">
          user input
        </label>
        <input
          type="text"
          id="userInput"
          required
          placeholder="Enter your address"
          onChange={userInput}
          value={userPrompt}
        />
        <label htmlFor="category">Enter the category</label>
        <select
          onChange={handleSelection}
          name="category"
          id="category"
          defaultValue=""
        >
          <option value="" disabled>
            Pick One:{' '}
          </option>
          <option value="coffee shops">coffee shops</option>
          <option value="restaurants">restaurants</option>
        </select>
        <button onClick={storedUserInput}>
          {userPrompt === '' ? 'Loading...' : 'Search'}
        </button>
        {/* <button type="submit">Submit✨</button> */}
      </form>
    </header>
  );
};

export default Form;
