import React from 'react';

export default class CharacterImage extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.image !== this.props.image) {
            return true;
        }
        return false;
    }
    render() {
        let img = require(`../../../images/scale/${this.props.image}`);
        return (
            <div className="character">
                <img key={img} alt="character" src={img} />
            </div>
        );
    }
}

CharacterImage.propTypes = {
    image: React.PropTypes.string.isRequired,
};
