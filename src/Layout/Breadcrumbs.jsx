import React from "react";
import { Link } from "react-router-dom";

// Nav bar page show on all but the home
// Takes in name of the deck when clicked on
// Includes if a deck is clicked on but nothing entered (=== null)
// example CreateDeck which has no name

export default function Breadcrumbs({ deckName, pathName, pageName }) {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          {deckName !== null ? (
            <li className="breadcrumb-item">
              <Link to={pathName}>{deckName}</Link>
            </li>
          ) : null}
          <li
            className="breadcrumb-item active"
            style={{ ariaCurrent: "page" }}
          >
            {pageName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
