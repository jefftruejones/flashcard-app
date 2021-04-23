import { useRouteMatch, Link, useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../../utils/api";
import { Plus, HouseFill } from "react-bootstrap-icons";
function Study() {
  const [deck, setDeck] = useState({ cards: [] });
  const [iterator, setIterator] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { url } = useRouteMatch();
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortContoller = new AbortController();
    async function LoadDeck() {
      try {
        let result = await readDeck(deckId);

        setDeck(result);
      } catch (error) {
        error.name === "AbortError" ? console.log("aborted") : console.error();
      }
    }
    LoadDeck();

    return () => abortContoller.abort();
  }, [deckId]);

  console.log("url = ", url);

  const clickHandler = () => {
    setFlipped((prev) => !prev);
  };

  const countHandler = () => {
    setIterator((prev) => prev + 1);
    setFlipped((prev) => !prev);
    if (iterator === deck.cards.length - 1) {
      if (
        window.confirm(
          "Restart Cards? Click 'cancel' to return to the home page."
        )
      ) {
        history.push(url);
        setIterator(0);
      } else {
        history.push("/");
      }
    }
  };

  console.log("deck is", deck);

  const cardsArray = deck.cards.map((card, index) => (
    <div className="card w-50" key={index}>
      <div className="card-body">
        <h5 className="card-title">
          Card {index + 1} of {deck.cards.length}
        </h5>
        {!flipped ? (
          <p className="card-text">{card.front}</p>
        ) : (
          <p className="card-text">{card.back}</p>
        )}
        <button className="btn btn-primary" onClick={clickHandler}>
          Flip
        </button>
        {flipped ? (
          <button className="btn btn-primary m-1" onClick={countHandler}>
            Next
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  ));

  if (cardsArray.length > 2) {
    return (
      <>
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
              <Link to={url}>Study</Link>
            </li>
          </ol>
        </nav>
        {cardsArray[iterator]}
      </>
    );
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={url}>Study</Link>
          </li>
        </ol>
      </nav>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {cardsArray.length} cards
        in this deck.
      </p>
      <Link
        to={`/decks/${deck.id}/cards/new`}
        type="button"
        className="btn btn-primary"
      >
        <Plus />
        &nbsp;Add Cards
      </Link>
    </>
  );
}

export default Study;
