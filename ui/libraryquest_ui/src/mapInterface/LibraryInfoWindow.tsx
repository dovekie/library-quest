import { ILibraryLocation } from "../types/ILibraryLocation";

export const LibraryInfoWindowContent = (props: {
  library: ILibraryLocation;
  membershipZones: number[] | undefined;
  handleUpdateMembership: any;
}) => {
  const readerHasMembership = props.membershipZones
    ? props.membershipZones.includes(props.library.membershipZone)
    : false;
  return (
    <div>
      <h2>{props.library.name}</h2>
      <div>
        <div>{props.library.address}</div>
        <div>
          {props.library.city}, CA {props.library.zip}
        </div>
        <div>{props.library.phone}</div>
        <div>
          <a href={props.library.url}>{props.library.url}</a>
        </div>
      </div>
      <div>
        <form onSubmit={props.handleUpdateMembership}>
          <input
            type="hidden"
            name="membershipZone"
            value={props.library.membershipZone}
          />
          <input
            className="change-membership-button"
            type="submit"
            name="actionType"
            // disabled={!props.reader}
            value={readerHasMembership ? "Remove" : "Add"}
          />
        </form>
      </div>
    </div>
  );
};
