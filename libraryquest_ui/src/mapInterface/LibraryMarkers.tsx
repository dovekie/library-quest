import { useState, useCallback } from "react";
import { ILibraryLocation } from "../types/ILibraryLocation";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { LibraryInfoWindowContent } from "./LibraryInfoWindow";
import { IReader } from "../types/IReader";

export const LibraryMarkers = ({
  locations,
  reader,
  handleUpdateMembership
}: {
  locations: any;
  reader: IReader | null;
  handleUpdateMembership: any
}) => {
  return locations.map((location: ILibraryLocation) => {
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const handleMarkerClick = useCallback(
      () => setInfoWindowShown((isShown) => !isShown),
      []
    );
    const [markerRef, marker] = useAdvancedMarkerRef();

    const handleClose = useCallback(() => setInfoWindowShown(false), []);
    return (
      <div key={location.key}>
        <AdvancedMarker
          ref={markerRef}
          position={location.location}
          className={
            location.isMember ? "membership-marker" : "no-membership-marker"
          }
          onClick={handleMarkerClick}
        >
          <Pin
            background={location.isMember ? "#1ef5e8" : "#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
        {infoWindowShown && (
          <InfoWindow anchor={marker} onClose={handleClose}>
            <LibraryInfoWindowContent
              library={{
                name: location.name,
                membershipZone: location.membershipZone,
              }}
              reader={reader}
              handleUpdateMembership={handleUpdateMembership} 
            />
          </InfoWindow>
        )}
      </div>
    );
  });
};
