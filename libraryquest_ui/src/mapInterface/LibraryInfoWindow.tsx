import { IReader } from "../types/IReader";

export const LibraryInfoWindowContent = (props: {
  library: { name: string; membershipZone: number };
  reader: IReader | null;
  handleUpdateMembership: any;
}) => {
  const readerHasMembership = props.reader?.membership_zone
    ? props.reader.membership_zone.includes(props.library.membershipZone)
    : false;
  return (
    <div>
      <h2>{props.library.name}</h2>
      <form onSubmit={props.handleUpdateMembership}>
        <input
          type="hidden"
          name="membershipZone"
          value={props.library.membershipZone}
        />
        <input
          className="change-membership-button"
          type="submit"
          disabled={!props.reader}
          value={readerHasMembership ? "Remove" : "Add"}
        />
      </form>
    </div>
  );
};
