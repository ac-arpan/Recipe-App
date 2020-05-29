import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from './components/Recipe';
import Loader from 'react-loader-spinner';

function App() {

  const APP_ID = '8e74ec26';
  const APP_KEY = '27fc9605413a7d54d9dfa7343ca620f0';

  const [recipes, setRecipes] = useState([]);
  const [recipeList, setRecipeList] = useState(10);
  const [search, setSeacrh] = useState('');
  const [query, setQuery] = useState('chicken');
  const [loader, setLoader] = useState(false);

  useEffect( () => {
    getReciepes();
    setLoader(false)
  },[query]);

 const getReciepes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setLoader(true)

    if (data.hits.length === 0)
    {
      setRecipeList(0);
      setRecipes([]);
    }
    else{
      setRecipes(data.hits);
      setRecipeList(data.hits.length);
    }
    
    
 }

 const handleInputChange = (e) => {
   setSeacrh(e.target.value);
 }

 const handleSubmit = (e) => {
   e.preventDefault();
   setQuery(search);
   setSeacrh('');
 }
  let message
  if(recipeList === 0){
    message = <div className="message">Nothing Found :(</div>
  }
  else{
    message = <div></div>
  }
  
  return (
    <div className="App">
      <form className="search-form" onSubmit={handleSubmit}>
        <input className="search-bar" type="text" value={search} onChange ={handleInputChange} />
        <button  className="search-button" type ="submit">search</button>
      </form>
      <div className="loader">
       {loader ?  <div className="recipes">
                    {recipes.map(recipe => (
                      <Recipe 
                        key={recipe.recipe.label} 
                        title = {recipe.recipe.label} 
                        calories = {recipe.recipe.calories} 
                        image = {recipe.recipe.image} 
                        ingredients ={recipe.recipe.ingredients}/>
                    ))}
                  </div> : <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />}
      </div>

      {message}
      
      
    </div>
  );
}

export default App;


// This useEffect hooks looks for the state properties which is changed(they are given inside the square bracket).If nothing is given there,it will run only once after the component is mounted
  // here counter is given,so useEffect will look for counter,if it is changed it will run
  // useEffect( () => {
  //   console.log("Effect has been run");
  // },[counter]);