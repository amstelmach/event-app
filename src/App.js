import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

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

  return (
    <div>
      {
        data.map(item => {
          return(
            <div key={item.id}>
              <h4>{item.title}</h4>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
