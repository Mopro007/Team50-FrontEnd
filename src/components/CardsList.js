//importing dependencies
import './index.css';
import './components.css';
import Card from './Card.js'
import React, { useEffect ,useState} from 'react';
//the cardslist component(the parent of the card component)

const CardsList = ({BrowseProjects,Participate}) => {
  const [projects, setProjects] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    BrowseProjects()
    .then(data => {
      setProjects(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className='cards_list'>
      <input className='searchBar' value={searchValue} type="text" placeholder="search" onChange={handleSearch} />
      <div className="cards_container">
        {filteredProjects.map((project) => ( <Card Participate={Participate} key={project['project_id']} project_id={project['project_id']} project_name={project['name']} description={project['description']} participants={project['participants']} /> ))}
      </div>
    </div>
  );
};

export default CardsList;