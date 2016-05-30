import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import * as testApi from '../../api';

const Breadcrumbs = ({ params }) => {
    if (!params.game) {
        return null
    } else if (params.game && !params.char) {
        return (
            <div>
                <Link to='characters'>Characters</Link> > {testApi.getProperGameTitle(params.game)}
            </div>
        )
    } else {
        return (
            <div>
                <Link to='characters'>Characters</Link>&nbsp;&gt;&nbsp;
                <Link to={`/characters/${params.game}`}>
                    {testApi.getProperGameTitle(params.game)}
                </Link>&nbsp;&gt;&nbsp;{testApi.getProperCharName(params.char)}
            </div>
        )
    }
}

Breadcrumbs.PropTypes = {
    params: PropTypes.object,
}

export default Breadcrumbs;
