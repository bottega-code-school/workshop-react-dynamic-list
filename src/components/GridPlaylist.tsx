import { orderBy } from "lodash";
import * as React from "react";

import playlistData from "../data";

export default function GridPlaylist() {
  return (
    <div className="grid-container">
      {orderBy(playlistData, "position").map((item) => (
        <div key={item.id} className="grid-container__item">
          <div>
            <img src={item.thumb} width="100%" />
          </div>
          <div className="title">{item.title}</div>
          <div>{item.artist}</div>
          <div>{item.released}</div>
          <div className="lyrics">{item.description}</div>
        </div>
      ))}
    </div>
  );
}
