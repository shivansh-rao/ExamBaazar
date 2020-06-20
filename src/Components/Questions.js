import React, { Component } from 'react'
import axios from 'axios'

export class Questions extends Component {
    constructor(props) {
        super(props)
        var arr=[];
        localStorage.setItem('pre',JSON.stringify(arr));
        this.state = {
             ques:[{type:'abs'}],
             abo:[],
             text:''
        }
    }

    componentDidMount=()=>{
        
      var  api={
           api_key: REACT_APP_KEY,
           api_secret: REACT_APP_SECRET,
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
                            abo:res.data.data.question});
            var q=this.state.abo;
            console.log(q);
        })
        .catch(err=>console.log(err))
    }

    output=(e)=>{
        e.preventDefault();
        this.setState({text:e.target.value})
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
    
       if(prev.length>=1)
       {var previous=prev.pop();
       localStorage.setItem('pre',JSON.stringify(prev));
       this.setState({ques:previous.questions,
                        abo:previous});}
       else{
        
           this.setState({ques:[{type:'abs'}],abo:[]})
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

        var type=q[0].type;

        //for mcq type

        if(type==="mcq")
        {
            return (
            <div>
                <p>{abo.test}</p>
                <h1>{abo.context}</h1>
                <div className="row">{pic}</div>
                <form onSubmit={this.next}>
                {   ques.map((q,index)=>
                    <div key={index}>
                        
                        <h2>{q.question}</h2>
                           
                        <h4>Correct:({q.marking.correct}) ,  Incorrect:({q.marking.incorrect})</h4>
                        <hr></hr>
                        
                        {   q.options.map((op,index)=>
                                <div key={index}>
                                    <label ><h3><strong>{index+1}   -  </strong><em>{op.option}</em></h3></label>
                                    <input type="checkbox" />
                                </div>
                        )}
                        
                     </div>
                )}
                        <input type="submit"></input>
                        </form>
                        <button onClick={this.next} className="">Next</button>
                        <button onClick={this.prev} className="">Previous</button>
            </div>
        )
                        }

                        //for numerical type
         else{
             return(
                    <div>
                        <p>{abo.test}</p>
                               <h1>{abo.context}</h1>
                            <div className="row">{pic}</div>
                                <form onSubmit={this.next}>
                                    {   ques.map((q,index)=>
                                        <div key={index}>
                                            <h2>{q.question}</h2>
                                            <h4>Correct:({q.marking.correct})  ,  Incorrect:({q.marking.incorrect})</h4>
                                            <hr></hr>
                                
                                            <input type="text" onChange={this.output} />
                                
                                        </div>
                                    )}
                                            <input type="submit" />
                                </form>
                                            <button onClick={this.next} className="">Next</button>
                                            <button onClick={this.prev} className="">Previous</button>
                    </div>
                                
                            )
                        }
    }
}

export default Questions
