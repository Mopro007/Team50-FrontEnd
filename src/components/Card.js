import React from 'react';

const Card = ({Participate,project_id,project_name,description,participants}) => {
  
  const handleParticipate = () => {
    Participate(project_id);
  };

  return (
    <div className="Card">
      <div>
        <h2>{project_name}</h2>
      </div>
      <div>
        <p>{description}</p>
      </div>
      <div>
        <button onClick={handleParticipate} style={{display:'inline', margin:'10px'}}>participate</button>
        <h3 style={{display:'inline'}}>participants:{participants.length}</h3>
      </div>
    </div>
  );
};

export default Card;