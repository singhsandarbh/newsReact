import { useState, useEffect } from "react";

const API_KEY = "50cad4dca2734aebaed078883c8a78ad";

function getHeadlines(search) {
  const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}&q=${search}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.articles) // get just the list of articles
    .then((articles) =>
      articles.map((article) => ({
        title: article.title,
        url: article.url,
      }))
    );
}

// function setNoHeadlines() {
//   return <p>Hello</p>;
// }

export function useNewsArticles(search) {
  const [loading, setLoading] = useState(true);
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);
  const [noHeadlines, setNoheadlines] = useState(false);

  useEffect(() => {
    getHeadlines(search)
      //.then(console.log(headlines.length))
      .then((headlines) => {
        headlines.length === 0 ? setNoheadlines(true) : setNoheadlines(false);
        setHeadlines(headlines);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [search]);

  return {
    loading,
    noHeadlines,
    headlines,
    error,
  };
}
