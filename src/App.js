import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    window.ipcRenderer.send('getProjects', 'ping');
    window.ipcRenderer.on('sendProjects', handleProjects);

    return () => {
      window.ipcRenderer.removeListener('sendProjects', handleProjects);
    };
  });

  const handleProjects = (event, data) => {
    setProjects(data);
  }
  // const click = () => {
  //   window.ipcRenderer.send('getProjects', 'ping')
  // }
  return (
    <div className="App">
      <h3>Hello wolrds!</h3>
      {projects &&
        <ul>
          {projects.map(project => (
            <li>{project.folder}</li>
          ))}
        </ul>
      }
    </div>
  );
}

export default App;
