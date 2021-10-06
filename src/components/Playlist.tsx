import * as React from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { VscListFilter } from "react-icons/vsc";
import { useHistory, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import DndPlaylist from "./DndPlaylist";
import GridPlaylist from "./GridPlaylist";
import Layout from "./Layout";

type ViewType = "row" | "grid";

export default function Playlist() {
  const history = useHistory();
  const { viewParam }: { viewParam?: ViewType } = useParams();

  const [viewToShow, setViewToShow] = React.useState<ViewType>(null);

  React.useEffect(() => {
    if (viewParam) {
      setViewToShow(viewParam);
    } else {
      history.push("/row");
    }
  }, [viewParam]);

  const listFilters = (
    <div className="layout-filter">
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
      {viewToShow === "row" && <DndPlaylist />}
      {viewToShow === "grid" && <GridPlaylist />}
    </Layout>
  );
}
