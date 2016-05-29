import React from 'react';
import { Link, browserHistory } from 'react-router';

const Home = () => (
    <div className="wrap">
        <div className="simple-container home">
            Run <br />
            <button type="button" onClick={() => browserHistory.push('/test')}>TEST</button> <br />
            <span>
                or learn more about <br />
                <Link to="/characters">Touhou characters</Link>
            </span>
        </div>
    </div>
);

Home.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default Home;
