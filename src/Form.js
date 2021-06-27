
import { useState, useEffect } from "react";



const Form = (props) => {

  const [userPrompt, setUserPrompt] = useState("");
  const [userCategoryForm, setUserCategoryForm] = useState("");
    
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
    const storedUserInput = (event) => {
      event.preventDefault();
      // props.userSubmitFlag();
      location = userPrompt;
      console.log(location + " in form");
      props.receivedUserInput(location);
    };

  const handleSelection = (event) => {
    // event.preventDefault();
    console.log(event);
    setUserCategoryForm(event.target.value);
    category = userCategoryForm;
    console.log(event.target.value + " in the form event");
    console.log(category + " in the form state variable");
    props.receivedUserCategory(category);
  }

 
    
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
          <label htmlFor="category">
            Enter the category
          </label>
          <select onChange={handleSelection} value={userCategoryForm} name="category" id="category">
            <option value="" disabled>Pick One: </option>
            <option value="coffee shops">coffee shops</option>
            <option value="restaurants">restaurants</option>
          </select>
          <button onClick={storedUserInput}>
            {userPrompt === "" ? "Loading..." : "Search"}
          </button>
          {/* <button type="submit">Submit✨</button> */}
        </form>
      </header>
    );
}

export default Form;