import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { ILibraryAddress } from "../types/ILibraryAddress";
import { ILibraryLocation } from "../types/ILibraryLocation";
import { LibraryMarkers } from "./LibraryMarkers";

export const MapBox = (props: {
  libraries: ILibraryAddress[];
  membershipZones: number[] | undefined;
  searchResults: string[] | null;
  handleUpdateMembership: any;
}) => {
  const locations: ILibraryLocation[] = props.libraries?.map((library) => ({
    address: library.address,
    city: library.city,
    isMember: props.membershipZones
      ? props.membershipZones?.includes(library.membership_zone)
      : false,
    key: library.id,
    location: { lat: library.lat, lng: library.lon },
    membershipZone: library.membership_zone,
    name: library.name,
    phone: library.phone,
    url: library.url,
    zip: library.zip,
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
          style={{ width: "80vw", height: "80vh" }}
          defaultCenter={{ lat: 37.80131995454677, lng: -122.26345590757161 }}
          defaultZoom={10}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <LibraryMarkers
            locations={locations}
            membershipZones={props.membershipZones}
            handleUpdateMembership={props.handleUpdateMembership}
            searchResults={props.searchResults}
          />
        </Map>
      </APIProvider>
    </div>
  );
};
