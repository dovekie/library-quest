export const Modal = (props: {
  show: boolean;
  children: any;
}) => {
  const showHideClassName = props.show
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal--window">
        {props.children}
      </section>
    </div>
  );
};
