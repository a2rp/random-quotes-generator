import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { FiBookOpen, FiCheck, FiCopy, FiRefreshCw } from "react-icons/fi";
import axios from "axios";
import styles from "./styles.module.scss";

const RandomQuotes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const fetchQuote = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      setQuotes((currentQuotes) => [response.data.slip.advice, ...currentQuotes]);
    } catch (requestError) {
      setError(requestError.message || "Unable to fetch advice right now.");
    } finally { setIsLoading(false); }
  };

  const copyQuote = async (quote, index) => {
    await navigator.clipboard.writeText(quote);
    setCopiedIndex(index);
    window.setTimeout(() => setCopiedIndex(null), 1400);
  };

  return <section className={styles.container} aria-labelledby="quotes-title">
    <div className={styles.intro}><span className={styles.eyebrow}>SMALL DAILY RESET</span><h1 id="quotes-title">Random Quotes</h1><p>Fetch a short piece of advice whenever you need a fresh perspective.</p></div>
    <div className={styles.toolBar}><div><span className={styles.statLabel}>COLLECTED</span><strong>{quotes.length} {quotes.length === 1 ? "thought" : "thoughts"}</strong></div><form onSubmit={fetchQuote}><Button type="submit" variant="contained" startIcon={isLoading ? <CircularProgress size={17} color="inherit" /> : <FiRefreshCw />} disabled={isLoading} className={styles.fetchButton}>{isLoading ? "Fetching..." : "Fetch advice"}</Button></form></div>
    {error && <p className={styles.error} role="alert">{error}</p>}
    {quotes.length === 0 ? <div className={styles.emptyState}><FiBookOpen /><p>Your collected advice will appear here.</p><span>Press the button to begin.</span></div> : <ol className={styles.quotes}>{quotes.map((quote,index) => <li className={styles.quoteCard} key={`${quote}-${index}`}><span className={styles.quoteMark}>“</span><p>{quote}</p><button type="button" className={styles.copyButton} onClick={() => copyQuote(quote,index)} aria-label="Copy advice">{copiedIndex === index ? <FiCheck /> : <FiCopy />} {copiedIndex === index ? "Copied" : "Copy"}</button></li>)}</ol>}
  </section>;
};
export default RandomQuotes;
