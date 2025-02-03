export const LibraryInfoWindowContent = (props: {
  library: { name: string; membershipZone: number };
  membershipZones: number[] | undefined;
  handleUpdateMembership: any;
}) => {
  const readerHasMembership = props.membershipZones
    ? props.membershipZones.includes(props.library.membershipZone)
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
          // disabled={!props.reader}
          value={readerHasMembership ? "Remove" : "Add"}
        />
      </form>
    </div>
  );
};
