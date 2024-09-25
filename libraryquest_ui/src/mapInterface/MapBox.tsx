import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { ILibraryAddress } from "../types/ILibraryAddress";
import { IPoi } from "../types/IPoi";
import { PoiMarkers } from "./PoiMarkers";
import { IReader } from "../types/IReader";

export const MapBox = (props: { libraries: ILibraryAddress[], reader: IReader}) => {
  const locations: IPoi[] = props.libraries.map((library) => ({
    key: library.id,
    location: { lat: library.lat, lng: library.lon },
    isMember: props.reader.membership_zone?.includes(library.membership_zone)
  }));
  const googleMapApiKey = import.meta.env.VITE_REACT_APP_MAP_KEY;
  const googleMapId = import.meta.env.VITE_REACT_APP_MAP_ID;
  return (
    <div className="map-box">
      <APIProvider
        apiKey={googleMapApiKey}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          mapId={googleMapId}
          style={{ width: "50vw", height: "50vh" }}
          defaultCenter={{ lat: 37.80131995454677, lng: -122.26345590757161 }}
          defaultZoom={7}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
        >
          <PoiMarkers pois={locations} />
        </Map>
      </APIProvider>
    </div>
  );
};
