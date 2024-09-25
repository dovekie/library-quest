export const LibraryInfoWindowContent = (props: {
  library: { name: string };
}) => {
  return (
    <div>
      <h2>{props.library.name}</h2>
    </div>
  );
};
