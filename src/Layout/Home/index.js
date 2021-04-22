import { Plus, EyeFill, Trash, CardText } from "react-bootstrap-icons";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api";
import { useState, useEffect } from "react";

function Home({ decks, setUpdated }) {
  const history = useHistory();
  // const handleDelete = ;

  let deckRend = decks.map((deck, index) => (
    <div className="row m-1" key={index}>
      {" "}
      <div className="card w-100" key={index}>
        <div className="card-body">
          {" "}
          <h5 className="card-title">{deck.name}</h5>{" "}
          <p>{deck.cards.length} cards</p>
          <p className="card-text">{deck.description}</p>{" "}
          <div className="row">
            {" "}
            <Link
              to={`/decks/${deck.id}`}
              className="btn btn-primary ml-1
         "
            >
              <EyeFill />
              &nbsp; View
            </Link>
            <Link
              to={`/decks/${deck.id}/study`}
              className="btn btn-primary ml-1"
            >
              <CardText /> &nbsp; Study
            </Link>
            <button
              type="button"
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
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="row">
        {" "}
        <Link to="/decks/new" className="btn btn-secondary text-white ml-4">
          <Plus /> Create Deck
        </Link>
      </div>
      {deckRend}
    </>
  );
}

export default Home;
