import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

const GamesTable = ({ children }) => (
    <DocumentTitle title="Characters | Touhou">
        <div className="simple-container">
            {children}
        </div>
    </DocumentTitle>
);

GamesTable.propTypes = {
    children: PropTypes.node,
};

export default GamesTable;
