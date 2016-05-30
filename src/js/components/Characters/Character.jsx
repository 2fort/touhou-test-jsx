import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import * as testApi from '../../api';

const Character = ({ params }) => {
    const charInfo = testApi.getSingleCharInfo(params.char);
    return (
        <DocumentTitle title="Characters | Touhou">
            <div className="singlechar">
                <h1>{charInfo.name}</h1>
                <div className="singlechar-flex">
                    <div>
                        <img alt="char" src={require(`../../../images/scale/${charInfo.image}`)} />
                    </div>
                    <div>
                        <p>Illustration author: <a href={charInfo.art.url}> {charInfo.art.author}</a></p>
                        <p>Character info: <a href={charInfo.wiki}>touhouwiki.net</a></p>
                    </div>
                </div>
            </div>
        </DocumentTitle>
    );
};

Character.propTypes = {
    params: PropTypes.object,
};

export default Character;
