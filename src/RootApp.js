import CardStackStyleInterpolator from './utils/transition/CardStackStyleInterpolator';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './pages/home';
import Shoulder from './pages/shoulder';
import Chat from './pages/chat';
import Mine from './pages/mine/index';
import {createAppContainer} from 'react-navigation';
import Splash from './pages/splash';
import {TabContainer} from './MainContainer';
import Activities from './pages/home/activities';
import Login from './pages/account/login';
import PublishActivity from "./pages/publish/publishActivity";
import PublishTrend from "./pages/publish/publishTrend";
import Register from './pages/account/register';
import Hobby from './pages/account/hobby';
import QrCode from './pages/mine/qrCode'
import Store from './pages/mine/store'
import StoreList from './pages/mine/storeList'
import EditInfo from './pages/mine/editInfo'
import Config from './pages/mine/config'
import OrderList from './pages/mine/orderList'
import ActivityDetail from "./pages/home/activity_detail";
import AddTicket from "./pages/home/add_ticket";
import TicketSelect from "./pages/home/ticket_select";
import Pay from "./pages/home/pay";
import activityList from './pages/shoulder/activity_list'
import DynamicDetail from './pages/home/dynamic_detail/index'
import ModifyTicket from "./pages/home/modify_ticket";
import Tickets from "./pages/home/tickets";
import InteractiveList from "./pages/chat/interactive";
import DigFriend from "./pages/chat/dig_friends";
import FriendsList from "./pages/chat/FriendsList";
import MyFollow from "./pages/chat/MyFollow";
import FansList from "./pages/chat/FansList";
import ActivityMsgList from './pages/chat/activity_list'
import EditDraft from "./pages/publish/editDraft";
import StrangerInfo from "./pages/strangerInfo";
import RelationChain from "./pages/relationChain";
import LocalTickets from "./pages/home/local_tickets";
import LocalAddTicket from "./pages/home/local_add_ticket";
import LocalModifyTicket from "./pages/home/local_modify_ticket";

const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
        const {scene} = sceneProps;
        const {route} = scene;
        const params = route.params || {};
        const transition = params.transition || 'forHorizontal';
        return CardStackStyleInterpolator[transition](sceneProps);
    },
});

const RootApp = createStackNavigator({
    Splash: {
        screen: Splash,
    },
    Login: {
        screen: Login,
    },
    TabContainer: {
        screen: TabContainer,
    },
    Home: {
        screen: Home,
    },
    Shoulder: {
        screen: Shoulder,
    },
    Chat: {
        screen: Chat,
    },
    Mine: {
        screen: Mine,
    },
    Activities: {
        screen: Activities,
    },
    PublishActivity: {
        screen: PublishActivity,
    },
    PublishTrend: {
        screen: PublishTrend,
    },
    Register: {
        screen: Register,
    },
    Hobby: {
        screen: Hobby,
    },
    QrCode: {
        screen: QrCode,
    },
    Store: {
        screen: Store,
    },
    StoreList: {
        screen: StoreList,
    },
    EditInfo: {
        screen: EditInfo,
    },
    Config: {
        screen: Config,
    },
    OrderList: {
        screen: OrderList,
    },
    ActivityDetail: {
        screen: ActivityDetail
    },
    TicketSelect: {
        screen: TicketSelect
    },
    Pay: {
        screen: Pay
    },
    Tickets: {
        screen: Tickets
    },
    AddTicket: {
        screen: AddTicket
    },
    ActivityList: {
        screen: activityList
    },
    DynamicDetail: {
        screen: DynamicDetail
    },
    ModifyTicket: {
        screen: ModifyTicket
    },
    InteractiveList: {
        screen: InteractiveList
    },
    DigFriend: {
        screen: DigFriend
    },
    ActivityMsgList: {
        screen: ActivityMsgList
    },
    FriendsList: {
        screen: FriendsList
    },
    MyFollow: {
        screen: MyFollow
    },
    EditDraft: {
        screen: EditDraft
    },
    StrangerInfo:{
        screen: StrangerInfo
    },
    FansList:{
        screen:FansList
    },
    RelationChain:{
        screen:RelationChain
    },
    LocalTickets: {
        screen: LocalTickets
    },
    LocalAddTicket: {
        screen: LocalAddTicket
    },
    LocalModifyTicket: {
        screen: LocalModifyTicket
    },
}, {
    headerMode: 'none',
    lazy: true,
    transitionConfig: TransitionConfiguration,
});

export default createAppContainer(RootApp);
