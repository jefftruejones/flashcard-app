import { useParams, Link, useRouteMatch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";
import { CardText, Trash, Plus, HouseFill } from "react-bootstrap-icons";

function Deck({ setUpdated }) {
  const { deckId } = useParams();

  const history = useHistory();
  const [deleted, setDeleted] = useState(0);
  const [deck, setDeck] = useState({});

  const { url } = useRouteMatch();

  console.log("deck url is", url);

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
  }, [deleted]);

  console.log("deck is ", deck);

  return (
    <>
      <h1>Deck</h1>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>
              <HouseFill />
              &nbsp;Home
            </Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            <Link to={url}>{deck.name}</Link>
          </li>
        </ol>
      </nav>
      <div className="card w-100">
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>{" "}
          <div className="row">
            {" "}
            <Link
              to={`/decks/${deck.id}/edit`}
              className="btn btn-secondary ml-1
         "
            >
              Edit
            </Link>
            <Link
              to={`/decks/${deck.id}/study`}
              className="btn btn-primary ml-1"
            >
              <CardText /> &nbsp; Study
            </Link>
            <Link
              to={`/decks/${deck.id}/cards/new`}
              className="btn btn-primary ml-1"
            >
              <Plus /> &nbsp; Add Cards
            </Link>
            <Link
              to={"/"}
              className="btn btn-danger offset-5 offset-md-7 offset-lg-8"
              onClick={() => {
                if (
                  window.confirm(
                    "Delete this deck? You will not be able to recover it!"
                  )
                ) {
                  const abortController = new AbortController();
                  try {
                    let result = deleteDeck(deck.id);
                    setUpdated(result);
                  } catch (error) {
                    throw error;
                  }
                } else {
                  history.push("/");
                }
              }}
            >
              <Trash />
            </Link>
          </div>
        </div>
      </div>
      <h2>Cards</h2>
      {deck.cards
        ? deck.cards.map((card) => (
            <div className="card">
              <div className="card-body">
                <div className="d-flex">
                  {" "}
                  <p className="card-text m-2 ">{card.front} </p>
                  <p className="card-text m-2 ">{card.back}</p>
                </div>
                <div className="d-flex justify-content-end">
                  {" "}
                  <Link
                    to={`/decks/${deck.id}/cards/${card.id}/edit`}
                    className="btn btn-secondary m-1 "
                  >
                    Edit
                  </Link>
                  <Link
                    to={url}
                    className="btn btn-danger m-1"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Delete this card? You will not be able to recover it!"
                        )
                      ) {
                        const abortController = new AbortController();
                        try {
                          let result = deleteCard(card.id);
                          setDeleted(result);
                        } catch (error) {
                          throw error;
                        }
                      } else {
                        console.log(history);
                      }
                    }}
                  >
                    <Trash />
                  </Link>
                </div>
              </div>
            </div>
          ))
        : null}
    </>
  );
}

export default Deck;
