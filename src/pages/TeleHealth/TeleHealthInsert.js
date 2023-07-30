import BoardHeader from "../../components/Header/HeaderBoard";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";

export default function TeleHealthInsert(){
    return <div id="main">
        <BoardHeader title="수의사 정보 등록"/>
        <div className="content">
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
        </div>
        <BottomTabNavigation/>
    </div>
}
