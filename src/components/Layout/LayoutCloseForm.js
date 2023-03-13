import HeaderClose from "../Header/HeaderClose";
import LayoutDefault from "./LayoutDefault";

export default function LayoutCloseForm({ title, children }) {
  return (
    <LayoutDefault header={<HeaderClose title={title} />}>
      <form id="close-form">{children}</form>
    </LayoutDefault>
  );
}
