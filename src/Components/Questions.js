import React, { Component } from 'react'
import axios from 'axios'
export class Questions extends Component {
    constructor(props) {
        super(props)
        var arr=[];
        localStorage.setItem('pre',JSON.stringify(arr));
        this.state = {
             ques:[],
             abo:[],
             text:'',
             radio:'',
             checkbox:''
        }
    }

    componentDidMount=()=>{
        
      var  api={
           api_key: 8107065529,
           api_secret: '5ee9d77168192338799149e3',
           examId:this.props.match.params.id
                }
            
            axios.post('https://www.exambazaar.com/api/coding-round/routes/random-question/',api,{
            headers:{
                "Content-Type":'application/json'
                    }
            }
                )
        .then(res=>{
            console.log(res.data)
            this.setState({ques:res.data.data.question.questions,
                            abo:res.data.data.question,text:'',radio:'',checkbox:''});
            var q=this.state.abo;
            console.log(q);
        })
        .catch(err=>console.log(err))
    }

    output=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    stay=(e)=>{
        e.preventDefault();
        this.setState({mark:e.target.value})
    }

    next=(e)=>{
        var a=localStorage.getItem('pre');
        var arr=JSON.parse(a);
        arr.push(this.state.abo)
        localStorage.setItem('pre',JSON.stringify(arr));
        e.preventDefault();
        this.componentDidMount();
    }

    prev=()=>{
       var p= localStorage.getItem('pre');
    
       var prev=JSON.parse(p);
    
       if(prev.length===1)
       {console.log(prev.length)
       var previous=prev.pop();
       var arr=[];
       localStorage.setItem('pre',JSON.stringify(arr));
       this.setState({ques:previous,
                        abo:previous,text:'',radio:'',checkbox:''});}
       else if(prev.length===0){
           console.log(prev.length)
            this.setState({ques:[],abo:[],text:'',mark:''})
            var arr=[];
            localStorage.setItem('pre',JSON.stringify(arr));
       }
       else{
           console.log(prev.length)
           var previous=prev.pop();
            localStorage.setItem('pre',JSON.stringify(prev));
            this.setState({ques:previous.questions,
                        abo:previous,text:'',radio:'',checkbox:''});
       }
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
                    <p className="pull-left">{abo.test}-{abo.examsection}</p><br/>
                        <h1>{abo.context}</h1>
                            <div className="row">{pic}</div><hr></hr>
                </div>
                <div>
                { ques.map((q,index)=>
                    <div style={{textAlign:'left'}}key={index} >
                        
                        <div><h2><strong style={{color:'brown'}}>Question:  {index+1}</strong><br/><br/>{q.question}</h2></div><br/>
                        <div className="pull-right"><h4 id="marking"><em style={{color:'brown'}}>Correct:</em>({q.marking.correct})   ,  <em style={{color:'brown'}}>Incorrect:</em>({q.marking.incorrect})</h4></div><hr/><br/><br/>
                        <div><br/>
                         <div style={{textAlign:'left'}}id="option">  

                        <form onSubmit={this.stay}>
                            
                        { (q.type==='mcq')?(q.options.map((op,index)=>
                                <div id="li" style={{marginLeft:'5px'}} key={index}>
                                  
                        <span><h3><em>{op.option}     </em>{(q.mcqma)?<input value={this.state.checkbox} name='checkbox' onChange={this.output} type="checkbox" />
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
                        <button onClick={this.next} className="btn btn-lg btn-success pull-right">Next</button>
                        
                        <button onClick={this.prev} className="btn btn-lg btn-success pull-left">Previous</button>
            </div>
        
                                
                            )
                        }
    }


export default Questions
