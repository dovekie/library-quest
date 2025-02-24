import { useState, useCallback } from "react";
import { ILibraryLocation } from "../types/ILibraryLocation";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { LibraryInfoWindowContent } from "./LibraryInfoWindow";

export const LibraryMarkers = ({
  locations,
  membershipZones,
  handleUpdateMembership,
  searchResults
}: {
  locations: ILibraryLocation[];
  membershipZones: number[] | undefined;
  handleUpdateMembership: (event: React.FormEvent<HTMLFormElement>) => void;
  searchResults: string[] | null
}) => {
  return locations.map((location: ILibraryLocation) => {
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const handleMarkerClick = useCallback(
      () => setInfoWindowShown((isShown) => !isShown),
      []
    );
    const [markerRef, marker] = useAdvancedMarkerRef();

    const handleClose = useCallback(() => setInfoWindowShown(false), []);
    const showMarker =
      !searchResults || searchResults?.includes(location.key);
    return (
      <div key={location.key}>
        {showMarker && <AdvancedMarker
          ref={markerRef}
          position={location.location}
          className={
            location.isMember
              ? `membership-marker library-${location.key}`
              : `no-membership-marker library-${location.key}`
          }
          onClick={handleMarkerClick}
        >
          <Pin
            background={location.isMember ? "#1ef5e8" : "#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>}
        {infoWindowShown && (
          <InfoWindow
            className="info-window"
            anchor={marker}
            onClose={handleClose}
          >
            <LibraryInfoWindowContent
              library={location}
              membershipZones={membershipZones}
              handleUpdateMembership={handleUpdateMembership}
            />
          </InfoWindow>
        )}
      </div>
    );
  });
};