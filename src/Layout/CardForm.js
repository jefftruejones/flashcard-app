import { Link } from "react-router-dom";
function CardForm({ submitHandler, handleChange, deck, card }) {
  return (
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
  );
}

export default CardForm;
