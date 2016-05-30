import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import Breadcrumbs from '../components/Characters/Breadcrumbs';

const Characters = ({ children, params }) => (
    <DocumentTitle title="Characters | Touhou">
        <div className="simple-container">
            <Breadcrumbs {...params} />
            {children}
        </div>
    </DocumentTitle>
);

Characters.propTypes = {
    children: PropTypes.node,
    params: PropTypes.object,
};

export default Characters;
