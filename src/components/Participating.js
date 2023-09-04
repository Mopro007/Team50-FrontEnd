import React from 'react';

const Participating = ({UnParticipate,Project_ID,Project_name,Project_description,Project_participants}) => {
  console.log(Project_participants[0]);
  const handleUnParticipate = () => {
    UnParticipate(Project_ID);
  };

  return (
    <div className="participating container">
      <h2>{Project_name}</h2>
      <p>{Project_description}</p>
      <p>Participants:</p>
      <ul>
        {Project_participants[0].map((participant) => (
          <li>{participant}</li>
        ))}
      </ul>
      <button onClick={() => handleUnParticipate()}>UnParticipate</button>
    </div>
  );
};

export default Participating;