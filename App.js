import React, { Component } from 'react'
import { Text, View, Button,Modal } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import ViewPager from '@react-native-community/viewpager';
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from 'react-native-vector-icons/Ionicons';


const Drawer=createDrawerNavigator()
const Tab=createBottomTabNavigator()
const Stack=createStackNavigator()
export default class App extends Component {
  constructor(props){
    super(props)
    this.state={visible:true}
  }
  _hide=()=>{
    this.setState({visible:false})

  }
  render() {
    return (
     <NavigationContainer>
       <Modal visible={this.state.visible}>
         <ViewPager style={{flex:1}} initialPage={0}>
         <View key="1">
          <Text>First page</Text>
          </View>
          <View key="2">
          <Text>Second page</Text>
          <Button title="关闭" onPress={this._hide}/>
          </View>
           </ViewPager>
       </Modal>
        <Drawer.Navigator>
          <Drawer.Screen name="Main" component={Main}/>
          <Drawer.Screen name="Setting" component={Setting}/>
        </Drawer.Navigator>
     </NavigationContainer>
    )
  }
}

class Main extends React.Component{

render(){
  return <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused
          ? 'ios-information-circle'
          : 'ios-information-circle-outline';
      } else if (route.name === 'Buy') {
        iconName = focused ? 'ios-list-box' : 'ios-list';
      }else if (route.name === 'FAQ') {
        iconName = focused ? 'logo-google' : 'logo-googleplus';
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  }}
  >

    <Tab.Screen name="Home" component={Home}/>
    <Tab.Screen name="Buy" component={Buy}/>
    <Tab.Screen name="FAQ" component={FAQ}/>
  </Tab.Navigator>

 }
}

class Setting extends React.Component{

  render(){
  return  <Text>Setting</Text>
  }
}

class Home extends React.Component{

  render(){
  return (<View>
    <AntDesign name="stepbackward" size={60} color="red"/>
    <Text>Main</Text>
  </View> )
  }
}

class Buy extends React.Component{

  render(){
  return  <Stack.Navigator>
  <Stack.Screen name="ItemList"component={ItemList}/>
  <Stack.Screen name="ItemDetail"component={ItemDetail}/>
</Stack.Navigator>
  }
}

class FAQ extends React.Component{

  render(){
  return  <Text>FAQ</Text>
  }
}

class ItemList extends React.Component{
  _showDetail=()=>{
    this.props.navigation.navigate("ItemDetail")
  }

  render(){
  return  <View>
  <Text>ItemList</Text>
  <Button title="查看详情" onPress={this._showDetail}/>
  </View>
  }
}

class ItemDetail extends React.Component{

  render(){
  return  <Text>ItemDetail</Text>
  }
}