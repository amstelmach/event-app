import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getApiData();
  }, [])

  const getApiData = async() => {
    const dataCheck = localStorage.getItem('data');
    if(dataCheck){
      setData(JSON.parse(dataCheck));
    } else {
      const api = await fetch(`https://gist.githubusercontent.com/codeholic/23e37417db35be1fa89060b360abb164/raw/deb4e8dd41c3df43fffb7e7f7770a38cd8cf5d40/event_venues.json`);
      const response = await api.json();
      localStorage.setItem('data', JSON.stringify(response));
      setData(response);
    }
  }

  const filterData = e => {
    const { value, checked } = e.target;
    if(!filtered.includes(value) && checked) {
      setFiltered([...filtered, value])
    } else {
      setFiltered(filtered.filter(item => item !== value))
    }
  }

  const filteredPlaces = filtered.length > 0 ? data.filter(place => filtered.includes(place.title)) : data;

  return (
    <div className="main-container">
      <h2>Filter by id:</h2>
      <div className="checkbox-container">
        {
          data.map(item => {
            return(
              <div className="single-checkbox" key={item.id}>
                <input type="checkbox" value={item.title} onChange={filterData}/>
                <label>{item.id}</label>
              </div>
            )
          })
        }
      </div>
      <h2>Places:</h2>
      {
        filteredPlaces.map(place => {
          return(
            <div key={place.id}>
              <h4>{place.title}</h4>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
