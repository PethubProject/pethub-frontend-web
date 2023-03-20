export const RegisterBtn = ({ onClick, children }) => {
  return (
    <div>
      <button onClick={onClick}>{children}</button>
    </div>
  );
};
