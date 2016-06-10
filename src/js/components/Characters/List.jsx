import { Component, PropTypes } from 'react';

class List extends Component {
    componentWillMount() {
        const { location: { pathname, query }, mode, actions: { changeMode } } = this.props;
        const { router: { replace } } = this.context;

        if (mode === 'table' && !query.mode) {
            replace({ pathname, query: { mode: 'table' }, state: {} });
        } else if (mode === 'grid' && query.mode === 'table') {
            changeMode('table');
        }
    }
    check() {
        const { location: { query }, mode } = this.props;
        let result = true;

        if (mode === 'grid' && query.mode === 'table') {
            result = false;
        }

        return result;
    }
}

List.propTypes = {
    location: PropTypes.object,
    mode: PropTypes.string,
    actions: PropTypes.object,
};

List.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default List;
