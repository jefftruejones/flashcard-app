import { useParams, Link, useRouteMatch } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";
import { readDeck, createCard } from "../../utils/api";
import { useEffect, useState } from "react";
function AddCard({ setUpdated }) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({ front: "", back: "" });
  const { url } = useRouteMatch();

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        let result = await readDeck(deckId, abortController.signal);
        setDeck(result);
      } catch (error) {
        throw error;
      }
    }
    getDeck();

    return () => abortController.abort();
  }, []);

  console.log("addcard rendered");

  const submitHandler = (event) => {
    event.preventDefault();

    setCard({ front: card.front, back: card.back });
    const abortController = new AbortController();

    try {
      async function CreateCard() {
        let result = await createCard(deckId, card, abortController.signal);

        setUpdated(result);
      }
      CreateCard();
    } catch (error) {
      throw error;
    }
    setCard({ front: "", back: "" });
  };

  return (
    <>
      {" "}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>
              <HouseFill /> &nbsp;Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={url}>Add Card</Link>
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="cardFront">Front</label>
          <textarea
            class="form-control"
            id="cardFront"
            rows="3"
            placeholder="This is where the term or question goes"
            name="front"
            value={card.front}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="DeckDescription">Back</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Place the answer or definition here"
            name="back"
            value={card.back}
            onChange={handleChange}
          ></textarea>
        </div>
        <Link
          to={`/decks/${deck.id}`}
          type="button"
          className="btn btn-secondary"
        >
          Done
        </Link>
        <button type="submit" className="btn btn-primary m-1">
          Submit
        </button>
      </form>
    </>
  );
}

export default AddCard;
