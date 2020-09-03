import * as React from 'react';
import SQLite from 'react-native-sqlite-storage';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput
} from 'react-native';
import { Component } from 'react';
// import { Container, Header, Content, Card, CardItem, Text,Left,Body,Title, Icon, Right } from 'native-base';


let db;


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userList:[],
      ha:["dd","dada"],
      text:""
    }
    db = SQLite.openDatabase(
      {
        name: 'ass.db',
        createFromLocation : 1,
        // location: 'default',
      },
      this.success.bind(this),
      this.fail
    );
    }
   

    success=()=>{
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM ass', [], (tx, results) => {
          let data = results.rows.length;
          let users = [];
          // console.log(results.rows.item(0))

  
          for (let i = 0; i < results.rows.length; i++) {
            users.push(results.rows.item(i));
          }
  
           this.setState({ userList:users});
        });
      });
      // alert("ok")
    }
  
    fail=(error)=>{
      console.error(error)
    }

    toggleLang=()=>{
      const {userList}=this.state
      let newlist=userList
      this.setState({
        userList:newlist.sort((a,b)=>a.Language>b.Language)
      })
    }

    togglelevel=()=>{
      const {userList}=this.state
      let newlist=userList
      this.setState({
        userList:newlist.sort((a,b)=>a.Level>b.Level)
      })
    }

    togglequal=()=>{
      const {userList}=this.state
      let newlist=userList
      this.setState({
        userList:newlist.sort((a,b)=>a.Quality<b.Quality)
      })
    }

    handletext=(text)=>{
      this.setState({
        text
      })

      this.setState({
        userList: this.state.userList.filter(function(person) {
          return person.Title != text;
        })
      });
    }

    filtering=()=>{
      // this.setState({
      //   userList: this.state.userList.filter(function(person) {
      //     return person.Title !== text;
      //   })
      // });
      console.log("filter")
    }


  render() {
    return (
    
         <View style={{flex:1}}>
           <View style={styles.titlebb}>
             <Text style={styles.title}>SuperSkool</Text>
           </View>

           {/* <View style={{padding: 10}}>
            <TextInput
              style={{height: 40,borderBottomColor:"blue",borderBottomWidth:1}}
              placeholder="Type here to filter...."
              onChangeText={this.handletext}
              value={this.state.text}
            />
            <View>
              <Button
                  onPress = {this.filtering}
                  title = "search"
                  color = "#222099"
                />
             </View>
            <Text>{this.state.text}</Text>
          </View> */}


           <View style={styles.btn}>
  

             <View style={styles.but}>
              <Button
                  onPress = {this.toggleLang}
                  title = "language"
                  color = "#000090"

                />
             </View>
              
              <View style={styles.but}>
                <Button
                  onPress = {this.togglelevel}
                  title = "level"
                  color = "#000090"
                  style={styles.but}
                />
              </View>
              
              <View style={styles.but}>
                <Button
                  onPress = {this.togglequal}
                  title = "quality"
                  color = "#000090"
                  style={styles.but}

                />
              </View>
             
           </View>
           <ScrollView>
        {
           this.state.userList.map(function(item, i){
             return(
               <View key={i} style={styles.card}>
                <Text style={styles.myState}>{item.Title}</Text>
                <Text style={styles.myState2}>{item.Language} - {item.Level} - {item.Quality}</Text>

               </View>
             )
           })
         }    
         </ScrollView>
      </View>
    
    );
  }
}

const styles = StyleSheet.create ({
  myState: {
     paddingHorizontal:10,
     textAlign: 'center',
     color: '#44449e',
     fontWeight: 'bold',
     fontSize: 18,
     justifyContent:"center",
     letterSpacing:1.51
  },
  myState2: {
    paddingHorizontal:10,
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14,
    justifyContent:"center",
    letterSpacing:1.51,
    marginTop:8
 },
  card:{
    backgroundColor:"#eee",
    marginBottom:12,
    marginHorizontal:26,
    // width:340,
    height:80,
    borderRadius:6,
    justifyContent:"center",
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  title:{
    justifyContent:"center",
    textAlign:"center",
    fontSize:28,
    fontWeight:"bold",
    color:"#000090",
    margin:14,
    letterSpacing:1.2,
    
  },
  titlebb:{
    backgroundColor:"#00008959",
    marginBottom:10
  },
  btn:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    marginBottom:20,
    margin:10
  },
  but:{
    width:120,
    letterSpacing:1.1,
    borderRadius:20
  }
})