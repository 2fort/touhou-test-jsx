import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

const Home = () => (
    <div className="simple-container home">
        Run <br />
        <button type="button" onClick={() => browserHistory.push('/test')}>TEST</button> <br />
        or learn more about <br />
        <Link to="/characters">Touhou characters</Link>
    </div>
);

Home.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default Home;
