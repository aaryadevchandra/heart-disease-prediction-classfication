import React from 'react';
import './App.css';
// import TopBarComponent from './TopBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ResultsComponent from './ResultsBar';
import { useState } from 'react';
import logo from '../src/logo.png';


const HomePageComponent = () => {

    let [resultsbar, setResultsBar] = useState(<></>);

  const sendData = async (age, sex, maxhrtrate, chol, fstbloodsugar, angina, chestpain, restecg, oldpeak, mjrvessel, thalas, restbp, slope ) => {

    // create a json of our data
    const userMedDetailsJSON = {
        age: age,
        sex: sex,
        maxhrtrate: maxhrtrate, 
        chol: chol, 
        fstbloodsugar: fstbloodsugar, 
        angina: angina, 
        chestpain: chestpain, 
        restecg: restecg, 
        oldpeak: oldpeak, 
        mjrvessel: mjrvessel, 
        thalas: thalas, 
        restbp: restbp, 
        slope: slope
    }

    const userMedDetailsJSONString = JSON.stringify(userMedDetailsJSON);
    const userMedDetailsJSONStringB64 = btoa(userMedDetailsJSONString);

    await axios.post(`http://127.0.0.1:5000/heartapi/${userMedDetailsJSONStringB64}`).then((response)=>{
        if(response.data === 1){
            console.log('response came 1');
            setResultsBar(resultsbar = <ResultsComponent prediction_text={'High Probability of Heart Disease'}/>)
        }else if(response.data === 0){
            console.log('response came 0');
            setResultsBar(resultsbar = <ResultsComponent prediction_text={'Low Probability of Heart Disease'}/>)
        }else{
            console.log('Returned data is not ideal');
            setResultsBar(resultsbar = <ResultsComponent prediction_text={response.data} />);
        }
    }).catch(err => setResultsBar(resultsbar = <ResultsComponent id='prediction_text_id' prediction_text={'Error connecting to backend...please try again later'} />));
    // document.getElementById( 'prediction_text_id' ).scrollIntoView();
  }

  return (
    <>

        <nav class="navbar navbar-light">
            <div className="container" style={{textAlign:"center", marginTop:"4vh"}}>
                <img src={logo} alt="" style={{margin: "auto", display: "block"}}/>
            </div>
        </nav>
    {/* <TopBarComponent /> */}
      <div className='container-fluid' style={{marginTop: '0vh', marginBottom: '7vh', marginLeft: '5vw', marginRight: '5vw'}}>
            <div className='row bold-font reg-font'>
                
                <div className='col text-start' style={{marginRight: '10vw'}}>
                    <div className='row'>
                        <div className='col' style={{ fontSize: '150%', fontWeight:'bolder'}}>
                            <p className='red-color'>ADD YOUR DETAILS</p>
                        </div>
                    </div>

                    {/* enter fname and lnam row */}
                    <div className='row'>
                        {/* fname col */}
                        <div className='col'>
                            <form>
                                <div className='form-group'>
                                    <label style={{marginBottom: '10px'}}>Enter age</label>
                                    <input id='age-id' className='form-control shadow input-shadow br-zero'></input>
                                </div>
                            </form>
                        </div>
                        {/* lname col */}
                        <div className='col'>
                            <form>
                                <div className='form-group'>
                                    <label style={{marginBottom: '10px'}}>Enter sex</label>
                                    {/* <input id='' className='form-control shadow input-shadow br-zero'></input> */}
                                    <select id='sex-id' class="form-control shadow input-shadow br-zero">
                                    <option>Female</option>
                                    <option>Male</option>
                                </select>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* enter email row */}
                    <div className='row' style={{marginTop: '25px'}}>
                        <div className='col'>
                            <form>
                                <label style={{marginBottom: '10px'}}>Maximum heart rate achieved</label>
                                <input id='maxhrtrate-id' className='form-control shadow input-shadow br-zero'></input>
                            </form>
                        </div>

                        <div className='col'>
                            <form>
                                <label style={{marginBottom: '10px'}}>Cholesterol in mg/dl</label>
                                <input id='chol-id' className='form-control shadow input-shadow br-zero'></input>
                            </form>
                        </div>

                        <div className='col'>
                            <form>
                                <label style={{marginBottom: '10px'}}>Fasting blood sugar</label>
                                {/* <input id='rsvp-form-wapno' className='form-control shadow input-shadow br-zero' style={{width: '50%'}}></input> */}
                                <select id='fstbloodsugar-id' className="form-control shadow input-shadow br-zero" >
                                    <option>&gt; 120 (mg/dl)</option>
                                    <option>&lt; 120 (mg/dl)</option>
                                </select>
                            </form>
                        </div>
                    </div>


                    {/* wa number row */}
                    <div className='row' style={{marginTop: '25px'}}>
                        
                    </div>

                    <div className='row' style={{marginTop: '25px'}}>
                        <div className='col'>
                            <form>
                                <label style={{marginBottom: '10px'}}>Angina during exercise</label>
                                {/* <input id='' className='form-control shadow input-shadow br-zero'></input> */}
                                <select id='angina-id' class="form-control shadow input-shadow br-zero">
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </form>
                        </div>

                        <div className='col'>
                            <form>
                                <label style={{marginBottom: '10px'}}>Chest Pain on a scale of 1-3</label>
                                <select id='chestpain-id' class="form-control shadow input-shadow br-zero">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </form>
                        </div>
                    </div>

                    <div className='row' style={{marginTop: '25px'}}>
                        <div className='col'>
                            <form>
                                <label style={{marginBottom: '10px'}}>Resting Electrocardiographic Results</label>
                                <select id='restecg-id' class="form-control shadow input-shadow br-zero">
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    
                                </select>
                            </form>
                        </div>

                        <div className='col'>
                            <form>
                                <label style={{marginBottom: '10px'}}>Enter Previous Peak</label>
                                <input id='oldpeak-id' className='form-control shadow input-shadow br-zero'></input>
                            </form>
                        </div>

                        <div className='col'>
                            <form>
                                <label style={{marginBottom: '10px'}}>Enter number of major vessels</label>
                                {/* <input id='' className='form-control shadow input-shadow br-zero'></input> */}
                                <select id='mjrvessel-id' class="form-control shadow input-shadow br-zero">
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    
                                </select>
                            </form>
                        </div>

                    </div>

                    {/* queries textarea */}
                    <div className='row' style={{marginTop: '25px'}}>
                      <div className='col'>
                            <form>
                                <label style={{marginBottom: '10px'}}>Thalassemia</label>
                                {/* <input id='' className='form-control shadow input-shadow br-zero'></input> */}
                                <select id='thalas-id' class="form-control shadow input-shadow br-zero">
                                    <option>Defect exists, can't be fixed</option>
                                    <option>Normal blood flow</option>
                                    <option>Defect exists, can be fixed</option>      
                                </select>
                            </form>
                        </div>

                        <div className='col'>
                            <form>
                                <div className='form-group'>
                                    <label style={{marginBottom: '10px'}}>Resting BP in mm/Hg</label>
                                    <input id='restbp-id' className='form-control shadow input-shadow br-zero'></input>
                                </div>
                            </form>
                        </div>

                        <div className='col'>
                            <form>
                                <div className='form-group'>
                                    <label style={{marginBottom: '10px'}}>Enter slope</label>
                                    {/* <input id='rsvp-form-first-name' className='form-control shadow input-shadow br-zero'></input> */}
                                    <select id='slope-id' class="form-control shadow input-shadow br-zero">
                                      <option>0</option>
                                      <option>1</option>
                                      <option>2</option>
                                </select>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='row text-center'>
                        <button className='btn shadow red-color submit-hover-animation' style={{backgroundColor: 'white', height: '50px', borderRadius: '5px', marginTop: '4vh'}} 
                        onClick={() => {
                            
                            //checking if all values have been filled in 
                            if (document.getElementById('age-id').value !== '' && document.getElementById('sex-id').value !== '' && document.getElementById('maxhrtrate-id').value !== ''
                        && document.getElementById('chol-id').value !== '' && document.getElementById('fstbloodsugar-id').value !== '' && 
                        document.getElementById('angina-id').value !== '' && document.getElementById('chestpain-id').value !== '' &&
                        document.getElementById('restecg-id').value !== '' && document.getElementById('oldpeak-id').value !== '' &&
                        document.getElementById('mjrvessel-id').value !== '' && document.getElementById('thalas-id').value !== '' &&
                        document.getElementById('restbp-id').value !== '' && document.getElementById('slope-id').value !== ''){
                            sendData(document.getElementById('age-id').value, document.getElementById('sex-id').value, document.getElementById('maxhrtrate-id').value,
                            document.getElementById('chol-id').value,document.getElementById('fstbloodsugar-id').value,document.getElementById('angina-id').value,
                            document.getElementById('chestpain-id').value
                            ,document.getElementById('restecg-id').value,document.getElementById('oldpeak-id').value,document.getElementById('mjrvessel-id').value,
                            document.getElementById('thalas-id').value,
                            document.getElementById('restbp-id').value,document.getElementById('slope-id').value)
                        } else {
                            alert('Please fill in all fields appropriately')
                        }                        
                        
                        }}>
                            Submit
                        </button>
                    </div>
                    
                </div>
                
            </div>
        </div>


        {/* results bar component */}

        {resultsbar}


    </>
  );

}

export default HomePageComponent;