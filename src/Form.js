
import { useState } from "react";


const Form = () => {

    const [userPrompt, setUserPrompt] = useState("");
    const [userLocation, setUserLocation] = useState('');

    const userInput = (event) => {
      setUserPrompt(event.target.value);
    //   console.log(event.target.value);
      setUserLocation(event.target.value);
      console.log(userLocation)
    };
    const storedUserInput = (event) => {
      event.preventDefault();
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
          <button onClick={storedUserInput}>
            {userPrompt === "" ? "Loading..." : "Search"}
          </button>
        </form>
      </header>
    );
}

export default Form;