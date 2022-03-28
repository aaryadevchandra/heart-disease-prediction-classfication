import React from 'react';


const ResultsComponent = (props) => {
    
    return (
        <>
        <div className='container'>
            <div className='row text-center'>
                <div className='col'>
                    {props.prediction_text}
                </div>
            </div>
        </div>
        </>
    );
}

export default ResultsComponent;