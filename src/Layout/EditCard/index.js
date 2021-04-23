import { useParams, Link, useRouteMatch, useHistory } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";
import { readDeck, updateCard, readCard } from "../../utils/api";
import { useEffect, useState } from "react";
import CardForm from "../CardForm";
function EditCard({ setUpdated }) {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({ front: "", back: "" });
  const { url } = useRouteMatch();
  const history = useHistory();

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

  useEffect(() => {
    const abortController = new AbortController();

    async function ReadCard() {
      try {
        let result = await readCard(cardId, abortController.signal);
        setCard(result);
      } catch (error) {
        throw error;
      }
    }
    ReadCard();

    return () => abortController.abort();
  }, []);

  console.log("addcard rendered");

  const submitHandler = (event) => {
    event.preventDefault();

    setCard((prev) => ({ ...prev, front: card.front, back: card.back }));
    const abortController = new AbortController();

    try {
      async function UpdateCard() {
        let result = await updateCard(card, abortController.signal);

        setUpdated(result);
      }
      UpdateCard();
    } catch (error) {
      throw error;
    }
    history.push(`/decks/${deck.id}`);
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
      <h2>Edit Card {card.id}</h2>
      <CardForm
        handleChange={handleChange}
        submitHandler={submitHandler}
        card={card}
        deck={deck}
      />
    </>
  );
}

export default EditCard;
