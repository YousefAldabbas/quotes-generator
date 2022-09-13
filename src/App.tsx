import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";

type headers = {
  "X-Api-Key": string;
  "Content-Type": string;
};

type getQuotes = {
  quotes: quotes;
};
type quotes = quote[];

type quote = {
  quote: string;
  author: string;
  category: string;
};
const headers = {
  "X-Api-Key": process.env.REACT_APP_API_KEY || "",
  "Content-Type": "application/json",
};

function App() {
  const [quotes, setQuotes] = useState<quotes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [currentQuote, setCurrentQuote] = useState<number>(0);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get<quotes | null>(
        "https://api.api-ninjas.com/v1/quotes?category=happiness&limit=20",
        {
          headers,
        }
      )
      .then(function (response) {
        setQuotes(response.data);
        getAnotherQuote();
        setIsSuccess(true);
        setIsLoading(false);
        console.log("success");
      })
      .catch(function (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  function getAnotherQuote() {
    quotes?.length
      ? setCurrentQuote(Math.floor(Math.random() * quotes?.length))
      : null;
  }
  if (isError) {
    return (
      <div className="text-center text-red-700 text-lg">
        something wrong happend please refresh the page
      </div>
    );
  }

  return (
    <div>
      <Header />
      {!isLoading ? (
        <>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="inline-block w-8 h-8 text-gray-400 mb-8"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                {quotes && (
                  <>
                    <p
                      className="leading-relaxed text-lg"
                      dangerouslySetInnerHTML={{
                        __html: quotes[currentQuote].quote,
                      }}
                    ></p>
                    <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
                    <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                      {quotes[currentQuote].author.toLowerCase()}
                    </h2>
                  </>
                )}

                <button className="btn" onClick={getAnotherQuote}>
                  another one
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="flex items-center justify-center space-x-2 animate-pulse">
          <div className="w-8 h-8 bg-slate-900 rounded-full"></div>
          <div className="w-8 h-8 bg-slate-900 rounded-full"></div>
          <div className="w-8 h-8 bg-slate-900 rounded-full"></div>
        </div>
      )}
    </div>
  );
}

export default App;
