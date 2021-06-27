
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
      console.log(category + " in the form state variable");
      console.log(location + " in form");

    };



 
    
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
          <select onChange={handleSelection} name="category" id="category" defaultValue="">
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