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
import dynamicDetail from './pages/home/dynamic_detail/index'
import ModifyTicket from "./pages/home/modify_ticket";
import Tickets from "./pages/home/tickets";

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
        screen: dynamicDetail
    },
    ModifyTicket: {
        screen: ModifyTicket
    }
}, {
    headerMode: 'none',
    lazy: true,
    transitionConfig: TransitionConfiguration,
});

export default createAppContainer(RootApp);
