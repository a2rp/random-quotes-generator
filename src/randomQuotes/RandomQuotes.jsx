import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";

const RandomQuotes = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [quotes, setQuotes] = useState([]);
    const [reversedQuotes, setReversedQuotes] = useState(quotes.reverse());

    useEffect(() => {
        const reversedArray = [];
        for (let i = quotes.length - 1; i >= 0; --i) {
            const valueAtIndex = quotes[i];
            reversedArray.push(valueAtIndex);
        }
        setReversedQuotes(reversedArray);
    }, [quotes]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const options = {
                method: "GET",
                url: "https://api.adviceslip.com/advice"
            };
            setIsLoading(true);
            setTimeout(async () => {
                const response = await axios(options);
                const quote = response.data.slip.advice;
                setQuotes([...quotes, quote]);
                setIsLoading(false);
            }, 1000 * 2);
        } catch (error) {
            setIsLoading(false);
            console.error(error, "error");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.heading}>Random Quotes</div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <Button
                        type="submit"
                        variant="contained"
                        className={styles.fetchQuoteButton}
                        disabled={isLoading}
                    >
                        {isLoading
                            ? <CircularProgress />
                            : "Fetch quote"}
                    </Button>
                </form>

                <div className={styles.quotes}>
                    <ol reversed>
                        {reversedQuotes.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default RandomQuotes

