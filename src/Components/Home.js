import React, { Component } from 'react'
import axios from 'axios'
import Mapping from './Mapping.js'

export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             streams:[],
             exams:[]
        }
    }
    componentDidMount=()=>{
        var api_key=8107065529;
        axios.get('https://www.exambazaar.com/api/coding-round/routes/exam-info/'+api_key)
        .then(response=>{
             console.log(response.data.data.exams);
            this.setState({streams:response.data.data.streams,exams:response.data.data.exams});
         console.log(this.state.streams)})
        .catch(err=>console.log(err))
    }
    
    render() {
        const {exams,streams}=this.state
        
        return (
            <div className="container">
            <header className="jumbotron">
              <div className="container">
                  <h1 style={{color: "green"}} >
                      ExamBazar!
                  </h1>
              </div>
            </header>
              <div className="row" >
                   { streams.map((c)=>
                      <div key={c._id} className="col-sm-12">
                          <div className="thumbnail">
                                 <div className="caption">
                                      <h1 style={{color:'blue'}}>
                                          {c.name}
                                      </h1>
                                  </div>
                                  <Mapping stream={c._id} exam={exams}/>
                          </div>
                      </div>
                   )}
              </div>
          </div>
        )
    }
}

export default Home
