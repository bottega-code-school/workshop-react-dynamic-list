import * as React from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { VscListFilter } from "react-icons/vsc";
import { useHistory, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Select from "react-select";

import DndPlaylist from "./DndPlaylist";
import GridPlaylist from "./GridPlaylist";
import Layout from "./Layout";

import data from "../data";
import { orderBy } from "lodash";

export default function Playlist() {
  const [playlistData, setPlaylistData] = React.useState(data);
  const [sortFilter, setSortFilter] = React.useState(null);

  return (
    <Layout>
      <DndPlaylist playlistData={playlistData} />
      {/* <GridPlaylist playlistData={playlistData} /> */}
    </Layout>
  );
}
