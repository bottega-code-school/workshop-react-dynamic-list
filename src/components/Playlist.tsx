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

type ViewType = "row" | "grid";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function Playlist() {
  const history = useHistory();
  const { viewParam }: { viewParam?: ViewType } = useParams();

  const [viewToShow, setViewToShow] = React.useState<ViewType>(null);
  const [playlistData, setPlaylistData] = React.useState(data);
  const [sortFilter, setSortFilter] = React.useState(null);

  React.useEffect(() => {
    if (viewParam) {
      setViewToShow(viewParam);
    } else {
      history.push("/row");
    }
  }, [viewParam]);

  React.useEffect(() => {
    if (sortFilter?.value === "newest") {
      setPlaylistData(orderBy(playlistData, "released", "desc"));
    } else if (sortFilter?.value === "oldest") {
      setPlaylistData(orderBy(playlistData, "released", "asc"));
    } else {
      setPlaylistData(orderBy(playlistData, "position"));
    }
  }, [sortFilter]);

  const listFilters = (
    <div className="layout-filter">
      {viewToShow === "grid" && (
        <Select
          value={sortFilter}
          onChange={setSortFilter}
          options={SORT_OPTIONS}
          placeholder="Sort by release date"
          isClearable
        />
      )}

      <NavLink
        to="/row"
        className="layout-filter--default"
        activeClassName="layout-filter--active"
      >
        <VscListFilter />
      </NavLink>

      <NavLink
        to="/grid"
        className="layout-filter--default"
        activeClassName="layout-filter--active"
      >
        <BsFillGrid3X3GapFill />
      </NavLink>
    </div>
  );

  return (
    <Layout>
      {listFilters}
      {viewToShow === "row" && <DndPlaylist playlistData={playlistData} />}
      {viewToShow === "grid" && <GridPlaylist playlistData={playlistData} />}
    </Layout>
  );
}
