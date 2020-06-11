import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import Video from 'react-native-video';
import Slider from '@react-native-community/slider'



const songs=["许嵩-雨幕.mp3","许嵩-如果当时.mp3","许嵩-半城烟沙.mp3"]
const url="http://47.95.10.109:8000/"
var p=0
export default class App extends Component {
  constructor(props){
    super(props)
    this._player=null
    this.state={paused:true,song:songs[p],source:{uri:url+songs[p]}
  ,duration: 1,currentTime:0
  
  }
    
  }
  _playControle=()=>{
    let paused=this.state.paused
    this.setState({paused:!paused})
  
  }

  _next=()=>{
    p++
    this.setState({source:{uri:url+songs[p]},song:songs[p]})
  }
  
  _prev=()=>{
    p--
    this.setState({source:{uri:url+songs[p]},song:songs[p]})
  }

  _loadHandler=({duration})=>{
      this.setState({duration})


  }

  _progressHandler=({currentTime})=>{
    this.setState({currentTime})


  }
  _seekHandler=value=>{
    this._player.seek(value)

  }

  _endHandler=()=>{
    this._next()
  }

  render() { 
    return (
      <View style={{flex:1,justifyContent:'center'}}>
        <Video 
        ref={ref=>this._player=ref}
        source={this.state.source}
        paused={this.state.paused}
        onLoad={this._loadHandler}
        onProgress={this._progressHandler}
        onEnd={this._endHandler}
        progressUpdateInterval={2000}
        />
        


        <Text style={{fontSize:20,textAlign:'center'}}>{this.state.song}</Text>
        <Slider style={{height:100}} minimumValue={0} 
        maximumValue={this.state.duration} 
        onSlidingComplete={this._seekHandler}
        value={this.state.currentTime}/>


        <View style={{flexDirection:'row-reverse',justifyContent:'space-between'}}>
        <Button title="上一首" onPress={this._prev}/>
        <Button title="播放/暂停" onPress={this._playControle}/>
        <Button title="下一首" onPress={this._next}/>
        </View>
      </View>
    )
  }
}
