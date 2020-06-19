import React from 'react'

function Mapping(props) {
    var streams=props.stream;
    var exams=props.exam;
    var related=exams.filter(a=>a.stream===streams);
    console.log(related);
    console.log(streams);
    console.log(exams);
    return (
        <React.Fragment>
            <div className="row" >
                   { related.map((d)=>
                      <div key={d._id} className="col-md-3 col-sm-6">
                          <div className="thumbnail">
                              <img src={d.logo}/>
                              
                                  <div className="caption">
                                      <h4>
                                          {d.name}
                                      </h4>
                                      
                                      <p>
                                          <a href={`/questions/${d._id}`} className="btn btn-primary">Related Questions...</a>
                                      </p>
                                  </div>
                          </div>
                      </div>
                   )}
              </div>
          </React.Fragment>
        
    )
}

export default Mapping
