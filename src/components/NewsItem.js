import React from "react";

const  NewsItem =(props)=> {
 
     let{title,description,imgUrl,newsUrl,author,date}=props;
    return (
      <div className="my-3">
        <div className="card" >
          <img src={imgUrl?imgUrl:"https://www.livemint.com/lm-img/img/2023/12/21/1600x900/INDIA-MARKETS_1663128119810_1703124943689.JPG"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author?author:'unknown'} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
 
}
export default  NewsItem