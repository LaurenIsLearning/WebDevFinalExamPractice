import { useEffect, useState } from 'react';
import './App.css'
console.log("THIS IS THE CORRECT APP.JSX");

function App() {
  //Any needed hooks
  //TODO
  // state
  const [result, setResult] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  //**************************** */
  useEffect(()=>{
    setTimeout(() => {
      setResult("");
    }, 3000)
  }, [result]);
  //**************************** */
  //Functions for API
  //upload
  async function upload(e) {
    e.preventDefault();

    //TODO
    //read values directly
    const animal = document.getElementById("name").value;
    const url = document.getElementById("picture").value;

    //send to backend
    const res = await fetch("/animals/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: e.target.name.value, 
        pictureUrl: e.target.picture.value })
    });

    if (res.status == 200){
      const result = await res.text();
      setResult(result);
    }

    // //cypress check msg string
    // const data = await res.json();
    // setResult(data.message);
  }

  //search
  async function search(e) {
    e.preventDefault();

    //TODO
    const query = document.querySelector("[data-testid='query']").value;

    const res = await fetch(`/animals/search/${query}`);
    const data = await res.json();

    // if not results, clear image
    if (data.length > 0) {
      setImgSrc(data[0].url);
    } else {
      setImgSrc("");
    }
  }

  //clear
  async function clear(e) {

    //TODO
    const res = await fetch("/animals/clear", {
      method: "DELETE"
    });

    const data = await res.json();

    //cypress checks this
    setResult(data.message);
    //clear img UI
    setImgSrc("");

  }

  return (
    <div className="App">
      <h1>Animal Collection</h1>
      <h3>Add Animal</h3>
      <form onSubmit={upload}>
        <label htmlFor="name">Animal:</label>
        <input type="text" name="name" id="name" placeholder='Name'
          data-testid="animal"
        />
        <label htmlFor="picture">Picture Address:</label>
        <input type="text" name="picture" id="picture"
          data-testid="url"
        />
        <button type='submit'
          data-testid="upload"
        >Upload</button>
      </form>

      <h3>Search Animal</h3>
      <form onSubmit={search}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name"
          data-testid="query"
        />
        <button type='submit'
          data-testid="search"
        >Search</button>
      </form>

      <p>
        <b data-testid="result">{/* TODO */ result}</b>
      </p>
      <section>
        <img src={/* TODO */ imgSrc} height={200} alt="Animal Image"
          data-testid="image"
        />
      </section>

      <button onClick={clear} data-testid="clear">Clear Animal Database</button>

    </div>
  )
};

export default App;

//npm run dev to start React app and Express server