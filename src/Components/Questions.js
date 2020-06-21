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
             mark:''
        }
    }

    componentDidMount=()=>{
        
      var  api={
           api_key: '######',
           api_secret: '######',
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
                            abo:res.data.data.question,text:'',mark:''});
            var q=this.state.abo;
            console.log(q);
        })
        .catch(err=>console.log(err))
    }

    output=(e)=>{
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value})
    }

    stay=(e)=>{
         e.preventDefault();
        this.setState({mark:e.target.value})
    }

    tick=(e)=>{
        e.preventDefault();
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
                        abo:previous,text:'',mark:''});}
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
                        abo:previous,text:'',mark:''});
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

                <div>
                <p className="pull-left">{abo.test}-{abo.examsection}</p><br/>
                <h1>{abo.context}</h1>
                <div className="row">{pic}</div>
                </div>
                {   ques.map((q,index)=>
                    <div key={index} >
                        
                        <h2>{q.question}</h2>
                        <h4 className="pull-right">Correct:({q.marking.correct})   ,  Incorrect:({q.marking.incorrect})</h4><br/>
                        <hr></hr>
                        <div>
                        <form onSubmit={this.stay}>
                        { (q.type==='mcq')?(q.options.map((op,index)=>
                                <div key={index}>
                                    <label ><h3><strong>{index+1} -  </strong><em>{op.option}</em></h3></label>
                        {(q.mcqma)?<input value={this.state.mark} name='mark' onChange={this.output} type="checkbox" />
                        :<input name='mark' value={this.state.mark} onChange={this.output} type="radio" />}
                                 </div>))
                        :<input type="text" name='text' value={this.state.text} onChange={this.output} style={{color:'black'}} />}
                                    
                        
                        <button type="submit" className="btn btn-primary">Mark</button>
                        </form>
                        </div>
                        
                     </div>
                )}
                        <button onClick={this.next} className="btn btn-lg btn-success pull-right">Next</button>
                        
                        <button onClick={this.prev} className="btn btn-lg btn-success pull-left">Previous</button>
            </div>
        
                                
                            )
                        }
    }


export default Questions
