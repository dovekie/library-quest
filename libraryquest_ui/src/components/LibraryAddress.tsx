import { ILibraryAddress } from "../types/ILibraryAddress";

export const LibraryAddress = (props: ILibraryAddress) => {
  return (
    <div key={props.id} className="library">
      <div className="library-name">{props.name}</div>
      <div className="library-address">{props.address}</div>
      <div className="library-latlon">
        {props.lat}, {props.lon}
      </div>
    </div>
  );
};
