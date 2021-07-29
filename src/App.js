import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { useNewsArticles } from "./api"; // import from a local file

function HeadlineTitle(props) {
  if (props.query) {
    return <h1>Headlines {props.query} </h1>;
  } else {
    return <h1>Headlines</h1>;
  }
  return null;
}

function Headline(props) {
  return (
    <div>
      <br />
      <h1>{props.title}</h1>
    </div>
  );
}

function NoHeadline(props) {
  if (props.noHeadline) {
    return (
      <div>
        <h1>No headlines found.</h1>
      </div>
    );
  } else return null;
}

function SearchBar(props) {
  var [innerSearch, setInnerSearch] = useState("");
  return (
    <div>
      <input
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        value={innerSearch}
        onChange={(e) => setInnerSearch(e.target.value)}
      />

      <button
        id="search-button"
        type="button"
        onClick={() => props.onSubmit(innerSearch)}
      >
        Search
      </button>

      <button
        id="reset-button"
        type="button"
        onClick={() => setInnerSearch("")}
      >
        Reset
      </button>
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const { loading, noHeadlines, headlines, error } = useNewsArticles(search);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong : {error.message}</p>;
  }

  return (
    <div className="App container">
      <HeadlineTitle query={search} />
      <SearchBar onSubmit={setSearch} />
      <NoHeadline noHeadline={noHeadlines} />

      {headlines.map((headline) => (
        // `headline` is now an object
        <Headline key={headline.url} title={headline.title} />
      ))}
    </div>
  );
}
