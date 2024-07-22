import React,{useEffect,useState} from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes  from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News =(props)=> {
const[articles,setArticles]=useState([])
const[ loading, setLoading]=useState(true)
const[ page, setPage]=useState(1)
const[ totalResults, setTotalResults]=useState(0)


   const capitaliseFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
  
  const  updateNews=async ()=>{
    props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5bdb85d8117a4cbeba014fc866e93d4d&page=${ page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data= await fetch(url)
     let parsedData=await data.json()
     console.log(parsedData);
     setArticles(parsedData.articles)
     setLoading(false)
     setTotalResults(parsedData.totalResults)
     props.setProgress(100);
      
  }
  useEffect (()=>{
    document.title=`${ capitaliseFirstLetter (props.category)}-NewsMonkey`
    updateNews();
  },[])

 const fetchMoreData = async() => {

 const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5bdb85d8117a4cbeba014fc866e93d4d&page=${page+1}&pageSize=${props.pageSize}`;
   
    let data= await fetch(url)
     let parsedData=await data.json()
     console.log(parsedData);
     setArticles(articles.concat(parsedData.articles))
     setTotalResults(parsedData.totalResults)
     setPage(page+1)

};

 
    return (
      <>
        
          <h1 className="text-center" style={{margin:'30px 0px', marginTop:'90px'}}>NewsMonkey-Top { capitaliseFirstLetter (props.category)} headlines </h1>
          {loading&&<Spinner/>}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        > 
         <div className="container">
        
          <div className="row mb-4">
          {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}  >
            <NewsItem   title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage} 
            newsUrl={element.url} author={element.author} date={element.publishedAt}/>
          </div>
            
          })} 
          </div>
          </div>
          </InfiniteScroll>
        
       
       
        </>
    );
  
}
News.defaultProps={
  country: 'in',
  pageSize: 9,
  category: 'general'
}
News.propTypes={
  country:propTypes.string,
  pageSize:propTypes.number,
  category:propTypes.string
}
export default News