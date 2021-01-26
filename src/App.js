import './App.css';
import { gql, useQuery } from '@apollo/client';


const GET_SPACESHIPS = gql`
    query getSpaceShips {
      launches(limit: 5) {
        launch_date_utc
        launch_success
        rocket {
          rocket_name
        }
        links {
          video_link
        }
        details
      }
    }`;

function App() {
  const { loading, error, data } = useQuery(GET_SPACESHIPS);

  return (
    <>
      <h1>5 lancements SpaceX</h1>
    <div className="wrapper">
        {loading && <h2>loading ...</h2>}
        {error && <h2>error</h2>}
        {data && console.log(data.launches)}
        {data &&
          data.launches.map((rocket) => (
            <div>
              <h1>{rocket.rocket.rocket_name}</h1>
              <h1>{rocket.launch_date_utc}</h1>
              <h2 className={rocket.launch_success === true ? 'success' : 'failed'}>Lancement {rocket.launch_success === true ? 'réussi' : 'échoué'}</h2>
              <h3>Détails:</h3>
              <p>{rocket.details}</p>
              <h3>Vidéo du lancement:</h3>
              <a target='blank' href={rocket.links.video_link}>Voir la vidéo du lancement sur Youtube</a>
            </div>
          ))
        }
    </div>
    </>
  );
}

export default App;
