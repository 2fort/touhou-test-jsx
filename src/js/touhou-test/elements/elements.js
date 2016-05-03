import React from 'react';

const NextButton = (props) => (
    <div className="navigation">
        <button type="button" className={props.color} id="next" onClick={() => props.changeStep('next')}>
           &nbsp;&gt;&nbsp;
        </button>
    </div>
);

const PrevButton = (props) => (
    <div className="navigation">
        <button type="button" className={props.color} id="prev" onClick={() => props.changeStep('prev')}>
            &nbsp;&lt;&nbsp;
        </button>
    </div>
);

const CharacterImage = (props) => (
    <div className="character">
        <img alt="character" src={"src/images/scale/" + props.image} />
    </div>
);

const CharacterButtons = (props) => {
    let buttons = props.buttons.map((btn, i) => {
        return (
            <button type="button" key={i} className={btn.color} id={'option' + (i + 1)} onClick={props.checkAnswer}>
                {btn.name}
            </button>
        );
    });
    return (<div className="buttons">{buttons}</div>)
}

const TopButtons = (props) => {
    let topButtons = props.data.map((topbtn, i) => {
        return (
            <div key={i} className={topbtn} id={'step' + (i+1)}> 
                &nbsp;
            </div>
        );
    });
    return (
        <div className="topbuttons" id="mytopbuttons">
            {topButtons}
        </div>
    )
};

export { NextButton, PrevButton, CharacterImage, CharacterButtons, TopButtons }
