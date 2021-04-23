import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";
import Deck from "./Deck";
import CreateDeck from "./CreateDeck";
import AddCard from "./AddCard";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import { listDecks } from "../utils/api";
import { Switch, Route, useRouteMatch } from "react-router-dom";

function Layout() {
  const { path } = useRouteMatch();
  const [updated, setUpdated] = useState(0);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function getDecks() {
      let result = await listDecks();

      setDecks(result);
    }
    getDecks();
  }, [updated]);

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path={path}>
            <Home decks={decks} setUpdated={setUpdated} />
          </Route>

          <Route path={"/decks/:deckId/study"}>
            <Study />
          </Route>

          <Route path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard setUpdated={setUpdated} />
          </Route>

          <Route path={"/decks/:deckId/cards/new"}>
            <AddCard setUpdated={setUpdated} />
          </Route>

          <Route path={"/decks/:deckId/edit"}>
            <EditDeck decks={decks} setUpdated={setUpdated} />
          </Route>

          <Route path={"/decks/new"}>
            <CreateDeck decks={decks} setUpdated={setUpdated} />
          </Route>

          <Route path={"/decks/:deckId"}>
            <Deck setUpdated={setUpdated} />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
