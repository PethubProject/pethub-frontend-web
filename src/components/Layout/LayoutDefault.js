import "./layout.css";
export default function LayoutDefault(props) {
  return (
    <>
      <div id="main">
        {props.header}
        <div id="content" className={props.className}>
          {props.children}
        </div>
        {props.bottom}
      </div>
    </>
  );
}
