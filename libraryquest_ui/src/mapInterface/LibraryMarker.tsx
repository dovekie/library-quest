import {
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { LibraryInfoWindowContent } from "./LibraryInfoWindow";
import { ILibraryLocation } from "../types/ILibraryLocation";
import { useState } from "react";

export const LibraryMarker = (props: {
  location: ILibraryLocation;
  membershipZones: number[] | undefined;
  searchResults: string[] | null;
  handleUpdateMembership: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const handleMarkerClick = () =>
    setInfoWindowShown((isShown: boolean) => !isShown);
  const handleClose = () => setInfoWindowShown(false);
  const showMarker =
    !props.searchResults || props.searchResults?.includes(props.location.key);

  return (
    <div key={props.location.key}>
      {showMarker && (
        <AdvancedMarker
          ref={markerRef}
          position={props.location.location}
          className={
            props.location.isMember
              ? `membership-marker library-${props.location.key}`
              : `no-membership-marker library-${props.location.key}`
          }
          onClick={handleMarkerClick}
        >
          (
          <Pin
            background={props.location.isMember ? "#1ef5e8" : "#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
          )
        </AdvancedMarker>
      )}
      {infoWindowShown && (
        <InfoWindow
          className="info-window"
          anchor={marker}
          onClose={handleClose}
        >
          <LibraryInfoWindowContent
            library={props.location}
            membershipZones={props.membershipZones}
            handleUpdateMembership={props.handleUpdateMembership}
          />
        </InfoWindow>
      )}
    </div>
  );
};
