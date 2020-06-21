import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
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
        var api_key="########";
        axios.get('https://www.exambazaar.com/api/coding-round/routes/exam-info/'+api_key)
        .then(response=>{
            this.setState({streams:response.data.data.streams,exams:response.data.data.exams});
         })
        .catch(err=>console.log(err))
    }

   componentWillUnmount=()=>{
       localStorage.clear()
   }
    render() {
        const {exams,streams}=this.state
        
        return(
            <React.Fragment>
            <header className="jumbotron">
              <div >
                  <h1 id="head" style={{color: "green"}} >
                     <span class="glyphicon glyphicon-book" aria-hidden="true"></span> ExamBaazar!
                  </h1>
              </div>
            </header>
              <div className="row" >
                   { streams.map((c,i)=>
                      <div key={c._id} className="col col-lg-12" >
                          
                          <div id="thumbnail" type="button"  className={(i%2)?'':'pull-right'}>
                              <div style={{background:'none'}} class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <h3 id="a">
                                             <span  className={(i%2)?'':'glyphicon glyphicon-menu-left'}  aria-hidden="true"></span><span>{c.name}</span><span className={(i%2)?'glyphicon glyphicon-menu-right':''}  aria-hidden="true"></span>
                                        </h3>
                               </div>
                           <div className="dropdown-menu" id={(i%2)?'l':'r'}>
                               <Mapping stream={c._id} exam={exams}/>
                           </div>
                                  
                            </div>
                      </div>
                     
                   )}
              </div>
          </React.Fragment>
          
        )
    }
}

export default Home
