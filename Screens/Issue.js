import * as React from 'react';
import { Text, View, StyleSheet, Touchable, TouchableOpacity, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Issue extends React.Component{
  constructor() {
    super();
    this.state={
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      bs: 'normal',
      scannedBid:'',
      scannedSid:'',
    }
  }
  getCameraPermissions= async (id) =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status==="granted",
      bs: id,
      scanned: false
    })
  }
  handleBarCodeScanner = async({type,data}) => {
    this.setState({
      scanned:true,
      scannedData:data,
      bs:'normal'
    })
  }
  render() {
    const hasCameraPermissions=this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const bs = this.state.bs;
    if(bs!=="normal" && hasCameraPermissions) {
      return(
        <BarCodeScanner
        onBarCodeScanned={scanned?undefined:this.handleBarCodeScanner}
        style={StyleSheet.absoluteFillObject}
        />
      );
    }
    else if(bs==="normal") {
      return(
        <View style ={styles.container}>
          <View>
            <Image source={require('../assets/booklogo.jpg')}
            style={{width:200,height:200}}/>
            <Text style={{textAlign:'center',fontSize:35}}>Wilie</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.inputBox}
            placeholder='book id'
            value={this.state.scannedBid}/>
            <TouchableOpacity
        style={styles.scanB}
        onPress={()=>{
          this.getCameraPermissions('book id')
        }}>
          <Text style={styles.scanT}>Scan</Text>
        </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.inputBox}
            placeholder='student id'
            value={this.state.scannedSid}/>
        <TouchableOpacity
        style={styles.scanB}
        onPress={()=>{
          this.getCameraPermissions('book id')
        }}>
          <Text style={styles.scanT}>Scan</Text>
        </TouchableOpacity>
        </View>
        </View>
      );
    } 
  }
    }
    
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:'center'
  },
  displayText:{
    fontSize:15,
    textDecorationLine:'underline'
  },
  scanB:{
    backgroundColor:'#263001',
    padding:20,
    margin:20
  },
  scanT:{
    fontSize:20,
    textAlign:'center',
    marginTop:10,
  },
  inputView:{
    flexDirection:'row',
    margin:20
  },
  inputBox:{
    width:200,
    height:40,
    borderWidth:1.2,
    borderRightWidth:0,
    fontSize:18
  },
  scanB:{
    backgroundColor:'#26ffa0',
    width: 50,
    borderWidth:2,
    borderLeftWidth:0
  }
})