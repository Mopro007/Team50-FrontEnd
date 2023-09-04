import React from "react";
import "./components/index.css";
import SignUpIn from '../src/components/SignUpIn';
import PostOrBrows from '../src/components/PostOrBrows';
import PostProject from '../src/components/PostProject';
import CardsList from '../src/components/CardsList';
import Participating from './components/Participating';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setPassword, setPhase, setProject, set_Project_ID, set_Project_name, set_Project_description, set_Project_participants_list } from './store/store';

const App = () => {
  const { email, password, phase, project } = useSelector((state) => state.user);
  const { Project_ID, Project_name, Project_description, Project_participants } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const nxtPhase = () => {
    dispatch(setPhase(phase + 1));
  };

  const prvsPhase = () => {
    dispatch(setPhase(phase - 1));
  };

  const SignIn = (formData) => {
    fetch('/signin', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status != 'success') {
          alert(data.message);
        } else {
          const  email  = data.user[2];
          const  password  = data.user[3];
          const  phase  = data.user[4];
          const  project  = data.user[5];
          if(project != null){
            const  project_id  = data.project[0];
            const  project_name  = data.project[1];
            const  project_description  = data.project[2];
            const  project_participants  = data.project[3].split(',');
            console.log(project_participants);
            dispatch(setProject(project));
            dispatch(set_Project_ID(project_id));
            dispatch(set_Project_name(project_name));
            dispatch(set_Project_description(project_description));
            dispatch(set_Project_participants_list(project_participants));
          }
          dispatch(setEmail(email));
          dispatch(setPassword(password));
          dispatch(setPhase(phase));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const SignUp = (formData) => {
    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Email already exists') {
          alert('Email already exists');
        } else {
          const  email  = data.message['email'];
          const  password  = data.message['password'];
          const  phase  = data.message['phase'];
          dispatch(setEmail(email));
          dispatch(setPassword(password));
          dispatch(setPhase(phase));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const postOrbrows = (choice) => {
    if (choice === 'post') {
      dispatch(setPhase(2));
    } else {
      dispatch(setPhase(3));
    }
  };

  const Post_Project = (formData) => {
    const data = {'name':formData['name'],'description':formData['description'],'email':email};
    fetch('/postproject', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status != 'success') {
          alert('something went wrong');
        } else {
          dispatch(setProject(data.project_id));
          dispatch(setPhase(4));
          dispatch(set_Project_ID(data.project_id));
          dispatch(set_Project_name(data.name));
          dispatch(set_Project_description(data.description));
          dispatch(set_Project_participants_list(data.participants));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const BrowseProjects = async () => {
    try {
      const response = await fetch('/browseprojects', { method: 'GET' });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const Participate = (project_id) => {
    const data = {'project_id':project_id,'email':email};
    fetch('/participate', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status == 'success') {
          dispatch(setProject(project_id));
          dispatch(setPhase(4));
          dispatch(set_Project_ID(data['project_id']));
          dispatch(set_Project_name(data['name']));
          dispatch(set_Project_description(data['description']));
          dispatch(set_Project_participants_list(data['participants']));
          console.log(data['participants'])
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const UnParticipate = (project_id) => {
    const data = {'project_id':project_id,'email':email};
    console.log(data);
    fetch('/unparticipate', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status != 'success') {
          console.log(data.message);
        } else {
          dispatch(setProject(null));
          dispatch(setPhase(1));
          dispatch(set_Project_ID(null));
          dispatch(set_Project_name(null));
          dispatch(set_Project_description(null));
          dispatch(set_Project_participants_list(null));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  let components = [
    <SignUpIn SignUp={SignUp} SignIn={SignIn} />,
    <PostOrBrows postOrbrows={postOrbrows} />,
    <PostProject Post_Project={Post_Project} />,
    <CardsList BrowseProjects={BrowseProjects} Participate={Participate}/>,
    <Participating UnParticipate={UnParticipate} Project_ID={Project_ID} Project_name={Project_name} Project_description={Project_description} Project_participants={[Project_participants]}/>,
  ];

  return (
    <div style={{display:"flex",flexFlow:"column",alignItems:"center",justifyContent:"center"}}>
      <button onClick={prvsPhase} style={{ display: phase === 0 || phase === 4 ? 'none' : 'block' }} className="backButton">Back</button>
      <div className="components_container">{components[phase]}</div>
    </div>
  );
};

export default App;