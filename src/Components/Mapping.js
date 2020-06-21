import React from 'react'
import ReactDOM from 'react-dom'
import '../App.css'

function Mapping(props) {
    var streams=props.stream;
    var exams=props.exam;
    var related=exams.filter(a=>a.stream===streams);
    
    return (
        <React.Fragment>
                   { related.map((d,i)=>
                   <a href={`/questions/${d._id}`}>
                          <li key={i}>
                              <span id="img" className='pull-right'><img id="abc" src={d.logo}/></span>
                             
                                <span className="caption">
                                    <h2>{d.name}</h2>
                                    <h4>Rank-{d.rank}</h4>
                                </span>
                                  
                          </li>
                   </a>
                   )}
          </React.Fragment>
          
        
    )
}

export default Mapping
