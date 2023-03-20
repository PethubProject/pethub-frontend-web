import MainHeader from "../../components/Header/HeaderMain";
import MenuList from "../../components/List/MenuList";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";

export default function More() {
  return (
    <div id="main">
      <MainHeader />
      <div className="content">
        <MenuList />
      </div>
      <BottomTabNavigation />
    </div>
  );
}
