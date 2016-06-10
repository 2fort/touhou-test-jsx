import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import Breadcrumbs from '../components/Characters/Breadcrumbs';
import ModeButtons from '../components/Characters/ModeButtons';

const Characters = ({ children, params, location: { pathname } }, { router }) => (
    <DocumentTitle title="Characters | Touhou">
        <div className="simple-container">
            <div className="flex-top">
                <Breadcrumbs {...params} />
                <ModeButtons replace={router.replace} pathname={pathname} char={params.char} />
            </div>
            {children}
        </div>
    </DocumentTitle>
);

Characters.contextTypes = {
    router: PropTypes.object.isRequired,
};

Characters.propTypes = {
    children: PropTypes.node,
    params: PropTypes.object,
    location: PropTypes.object,
};

export default Characters;
