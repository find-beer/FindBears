import CardStackStyleInterpolator from './utils/transition/CardStackStyleInterpolator';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './pages/home';
import Shoulder from './pages/shoulder';
import Chat from './pages/chat';
import Mine from './pages/mine';
import {createAppContainer} from 'react-navigation';
import Splash from './pages/splash';
import {TabContainer} from './MainContainer';
import Activities from './pages/home/activities';
import Login from './pages/account/login';

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
}, {
    headerMode: 'none',
    lazy: true,
    transitionConfig: TransitionConfiguration,
});

export default createAppContainer(RootApp);
