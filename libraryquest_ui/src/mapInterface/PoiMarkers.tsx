import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { IPoi } from "../types/IPoi";

export const PoiMarkers = (props: { pois: IPoi[] }) => {
  return (
    <>
      {props.pois.map((poi: IPoi) => (
        <AdvancedMarker key={poi.key} position={poi.location}>
          <Pin
            background={poi.isMember ? "#1ef5e8" : "#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};
