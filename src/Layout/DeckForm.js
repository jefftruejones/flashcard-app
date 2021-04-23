import { Link } from "react-router-dom";
function DeckForm({ submitHandler, deck, handleChange, decks }) {
  return (
    <>
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
            className="form-control"
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

export default DeckForm;
