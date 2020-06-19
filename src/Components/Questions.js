import React, { Component } from 'react'
import axios from 'axios'
export class Questions extends Component {
    constructor(props) {
        super(props)
        var arr=[];
        localStorage.setItem('pre',JSON.stringify(arr));
        this.state = {
             ques:[{type:'abs'}],
             text:''
        }
    }
    componentDidMount=()=>{
        
      var  api={
           api_key:'8107065529',
           api_secret:'5ee9d77168192338799149e3',
           examId:this.props.match.params.id
                }
            
            axios.post('https://www.exambazaar.com/api/coding-round/routes/random-question/',api,{
            headers:{
                "Content-Type":'application/json'
                    }
            }
                )
        .then(res=>{
            this.setState({ques:res.data.data.question.questions});
            var q=this.state.ques;
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
        arr.push(this.state.ques)
        localStorage.setItem('pre',JSON.stringify(arr));
         e.preventDefault();
        this.componentDidMount();
    }

    prev=()=>{
       var p= localStorage.getItem('pre');
    //    console.log(p.length)
       var prev=JSON.parse(p);
    //    console.log(prev.length)
       if(prev.length>=1)
       {var previous=prev.pop();
       localStorage.setItem('pre',JSON.stringify(prev));
       this.setState({ques:previous});}
       else{
        //    console.log(prev)
           this.setState({ques:[{type:'abs'}]})
       }
    }
    render() {
        var {ques}=this.state
        var q=this.state.ques
        var type=q[0].type;
        if(type==="mcq")
        {
            return (
            <div>
                {ques.map((q,index)=>
                    <div key={index}>
                        <h2>{q.question}</h2>
                        <hr></hr>
                        <form onSubmit={this.next}>
                        {q.options.map((op,index)=>
                            <div key={index}>
                             <label ><h3><strong>{index+1}-  </strong><em>{op.option}</em></h3></label>
                              <input type="checkbox" />
                              </div>
                        )}
                        <input type="submit"></input>
                        </form>
                     </div>
                        )}
                        <button onClick={this.next} className="">Next</button>
                        <button onClick={this.prev} className="">Previous</button>
            </div>
        )
                        }
         else{
                            return(
            <div>
            {ques.map((q,index)=>
                    <div key={index}>
                        <h2>{q.question}</h2>
                        <hr></hr>
                        <form onSubmit={this.next}>
                        <input type="text" onChange={this.output}></input>
                        <input type="submit"></input>
                        </form>
                     </div>
            )}
                        <button onClick={this.next} className="">Next</button>
                        <button onClick={this.prev} className="">Previous</button>
            </div>
                                
                            )
                        }
    }
}

export default Questions
