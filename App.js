import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
// You can import from local files
import Issue from './Screens/Issue';
import Search from './Screens/Search'

export default function App() {
    return <AppContainer/>
}
const TabNavigator = createBottomTabNavigator({
  Issue:Issue,
  Search:Search},
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon:({focused, horizontal, tintColor})=>{
        const routeName = navigation.state.routeName
        if(routeName === 'Issue') {
          return(
            <Image 
            source = {require('./assets/book.png')}
            style={{width:40, height:40}}/>
          )
        }
        else if(routeName === 'Search') {
          return(
            <Image
            source={require('./assets/searchingbook.png')}
            style={{width:40,height:40}}/>
          )
        }
      }
    })
});
const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    alignItems:'center'
  },
});
