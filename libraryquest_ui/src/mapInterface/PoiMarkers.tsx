import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { IPoi } from "../types/IPoi";

export const PoiMarkers = (props: { pois: IPoi[] }) => {
  return (
    <>
      {props.pois.map((poi: IPoi) => (
        <AdvancedMarker key={poi.key} position={poi.location}>
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};
