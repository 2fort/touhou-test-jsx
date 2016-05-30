import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import Breadcrumbs from '../components/Characters/Breadcrumbs'

const Characters = ({ children, params }) => {
    console.log(params);
    return(
        <DocumentTitle title="Characters | Touhou">
            <div className="simple-container">
                <Breadcrumbs params={params} />
                {children}
            </div>
        </DocumentTitle>
    )
};

Characters.propTypes = {
    children: PropTypes.node,
    params: PropTypes.object,
};

export default Characters;
