import React from 'react';


const ResultsComponent = (props) => {
    
    return (
        <>
        <div className='container'>
            <div className='row text-center'>
                <div className='col red-color' style={{padding: "0px 0px 100px 0px", fontWeight: "bold", fontSize: "150%"}}>
                    {props.prediction_text}
                </div>
            </div>
        </div>
        </>
    );
}

export default ResultsComponent;