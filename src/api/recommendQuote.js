import api from "./inspiration_v2_api";

const recommendQuote = async (quote, author, recommender) => {
    const res = await api.post(
        "/quote",
        {
            quote: quote,
            author: author,
            recommender: recommender
        }
    );

    return res;
}

export default recommendQuote;
