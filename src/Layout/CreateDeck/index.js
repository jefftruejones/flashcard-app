import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";
import { useState } from "react";
import { createDeck } from "../../utils/api";
function CreateDeck({ decks, setUpdated }) {
  const { url } = useRouteMatch();
  const [deck, setDeck] = useState({ name: "", description: "" });

  const history = useHistory();

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let deckId = decks.length + 1;
    setDeck({ name: deck.name, description: deck.description });
    const abortController = new AbortController();

    try {
      async function CreateDeck() {
        let result = await createDeck(deck, abortController.signal);

        setUpdated(result);
      }
      CreateDeck();
    } catch (error) {
      throw error;
    }

    history.push(`/decks/${deckId}`);
  };
  console.log(deck);
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>
              <HouseFill />
              &nbsp;Home
            </Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            <Link to={url}>Create Deck</Link>
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="DeckName"
            placeholder="Deck name"
            name="name"
            value={deck.name}
            onChange={handleChange}
            aria-describedby="deckName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="DeckDescription">Description</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Brief decription of the deck"
            name="description"
            value={deck.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <Link to={"/"} type="button" className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary m-1">
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateDeck;
