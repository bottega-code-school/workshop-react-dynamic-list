import * as React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { VscThreeBars } from "react-icons/vsc";
import { range, orderBy } from "lodash";

type SongType = {
  id: number;
  title: string;
  artist: string;
  released: string;
  thumb: string;
  position: number;
};
export default function DndPlaylist({ playlistData }) {
  const [playlist, setPlaylist] = React.useState<SongType[]>(playlistData);

  const listRenderer = orderBy(playlist, "position").map((item) => (
    <Draggable
      draggableId={item.id.toString()}
      index={item.position}
      key={item.id}
    >
      {(provided) => (
        <div
          className="list-container__item"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <a {...provided.dragHandleProps} className="handle">
            <VscThreeBars />
          </a>
          <div>
            <img src={item.thumb} width="100%" />
          </div>
          <div>{item.title}</div>
          <div>{item.artist}</div>
          <div>{item.released}</div>
        </div>
      )}
    </Draggable>
  ));

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const directionOfDrag =
      destination.index > source.index ? "GREATER" : "LESS";
    let affectedRange: any[];
    if (directionOfDrag === "GREATER") {
      affectedRange = range(source.index, destination.index + 1);
    } else if (directionOfDrag === "LESS") {
      affectedRange = range(destination.index, source.index);
    }
    const reOrderedPlaylist = playlist.map((song) => {
      if (song.id === parseInt(result.draggableId)) {
        song.position = result.destination.index;
        return song;
      } else if (affectedRange.includes(song.position)) {
        if (directionOfDrag === "GREATER") {
          song.position = song.position - 1;
          return song;
        } else if (directionOfDrag === "LESS") {
          song.position = song.position + 1;
          return song;
        }
      } else {
        return song;
      }
    });
    setPlaylist(reOrderedPlaylist);
  };

  return (
    <div className="list-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"PLAYLIST"}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {listRenderer}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
