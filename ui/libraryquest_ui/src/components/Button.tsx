export const Button = (props: {
  className?: string;
  id: string;
  onClick: any;
  label: string;
}) => {
  const { className, onClick, label, id } = props;
  return (
    <button
      id={id}
      className={className}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
