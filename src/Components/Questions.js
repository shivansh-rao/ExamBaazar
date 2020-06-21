import React, { Component } from 'react'
import axios from 'axios'

export class Questions extends Component {
    constructor(props) {
        super(props)
        var arr=[{}];
        localStorage.setItem('pre',JSON.stringify(arr));
        this.state = {
             ques:[],
             abo:[],
             text:'',
             radio:'',
             checkbox:''
        }
    }

    componentWillMount=()=>{
        
      var  api={
           api_key: "#######",
           api_secret: '###########',
           examId:this.props.match.params.id
                }
            
            axios.post('https://www.exambazaar.com/api/coding-round/routes/random-question/',api,{
            headers:{
                "Content-Type":'application/json'
                    }
            }
                )
        .then(res=>{
            this.setState({ques:res.data.data.question.questions,
                            abo:res.data.data.question,text:'',radio:'',checkbox:''});
            var q=this.state.abo;
            
        })
        .catch(err=>console.log(err))
    }

    output=(e)=>{
         this.setState({[e.target.text]:e.target.value})
    }

    stay=(e)=>{
        e.preventDefault();
         this.setState({[e.target.name]:e.target.value})
    }

    next=(e)=>{
        var a=localStorage.getItem('pre');
        var arr=JSON.parse(a);
        
        arr.push(this.state.abo)
        localStorage.setItem('pre',JSON.stringify(arr));
        this.componentWillMount();
    }

    prev=()=>{
       var p= localStorage.getItem('pre');
    
       var prev=JSON.parse(p);
    
       if(prev.length===1)
       {
       var arr=[{}];
       localStorage.setItem('pre',JSON.stringify(arr));
       this.setState({ques:this.state.ques,
                        abo:this.state.abo,text:'',radio:'',checkbox:''});}
    
       else{
           
           var previous=prev.pop();
            localStorage.setItem('pre',JSON.stringify(prev));
            this.setState({ques:previous.questions,
                          abo:previous,text:'',radio:'',checkbox:''});
       }
    }

    componentWillUnmount=()=>{
        localStorage.clear();
    }
    

    render() {
        var {ques,abo}=this.state
        var q=this.state.ques

        if(abo.images!=null)
        {
            var pic=abo.images.map((im,index)=><div key={index} className="col-sm-12">
                          <div className="thumbnail">
                              <img src={im}/></div></div>)
        }

        else{
            var pic=<img src={abo.images}/>
        }

            return (
            <div>
              <div id="que">
                <div>
                    <p style={{textAlign:"left"}}>{abo.test}-{abo.examsection}</p><br/>
                        <h1>{abo.context}</h1>
                            <div className="row">{pic}</div><hr></hr>
                </div>
                <div>
                { ques.map((q,index)=>
                    <div style={{textAlign:'left'}}key={index} >
                        
                        <div><h2>
                         <strong style={{color:'brown'}}>Question:  {index+1}</strong><br/><br/>
                         {q.question}
                        </h2><br/>

                        {(q.type==='mcq')?
                        ((q.mcqma)?<span style={{color:'blue'}}>(Multiple Correct Answer)</span>:<sapn style={{color:'blue'}}>(Single Correct Answer)</sapn>)
                        :<span style={{color:'blue'}}>(Numerical)</span>}
                        

                        <h4 style={{textAlign:'right'}}><em style={{color:'brown'}}>Correct:</em>({q.marking.correct})  ,  <em style={{color:'brown'}}>Incorrect:</em>({q.marking.incorrect})</h4></div><hr/><br/><br/>
                        <div><br/>
                         <div style={{textAlign:'left'}}id="option">  

                        <form onSubmit={this.stay}>
                            
                        { (q.type==='mcq')?(q.options.map((op,index)=>
                                <div id="li" style={{marginLeft:'5px'}} key={index}>
                                  
                        <span><h3><em>{op.option}     </em>{(q.mcqma)?<input  value={this.state.checkbox} name='checkbox' onChange={this.output} type="checkbox" />
                        :<input name='radio' value={this.state.radio} onChange={this.output} type="radio" />}</h3></span><br/>
                            
                             </div>))
                        :<input type="text" name='text' value={this.state.text} onChange={this.output} style={{color:'black'}} />}<br/><br/>
                                    
                        
                        <button type="submit" className="btn btn-lg btn-primary">Mark</button>
                    
                        </form>

                        </div>
                        </div><br/><hr></hr>
                        
                     </div>
                )}
                </div>
              </div>
                        <button onClick={this.next} id="next" className="btn btn-lg btn-success pull-right">Next</button>
                        
                        <button onClick={this.prev} id="prev" className="btn btn-lg btn-success pull-left">Previous</button>
            </div>
        
                                
                            )
                        }
    }


export default Questions
