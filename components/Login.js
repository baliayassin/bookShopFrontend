import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View,Image ,TextInput,TouchableOpacity} from 'react-native';
//import tabNav from './tabNavigation'



 export default function Login({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');

const login= async()=>{


    let url = await `http://192.168.1.112:5000/api/users/${email}`
    fetch(url)
    .then((response) => response.json())
    .then(json =>{ setData(json)
        console.log(json)
        //console.log(data.isAdmin)

    })
    .catch((error) => console.error(error))

    
    if(data.isAdmin == true){
        console.log("is admin")
 
   }

//navigation.navigate(<tabNav/>)
}

  return (
    <View style={styles.container}>
      
      <Text style={{fontSize:24,position:'absolute',top:100}}>Book shop</Text>

      <View style={styles.inputView}>
  <TextInput
    style={styles.TextInput}
    placeholder="Email"
    placeholderTextColor="#003f5c"
    onChangeText={(email) => setEmail(email)}
  />
</View>
 
<View style={styles.inputView}>
  <TextInput
    style={styles.TextInput}
    placeholder="Password"
    placeholderTextColor="#003f5c"
    secureTextEntry={true}
    onChangeText={(password) => setPassword(password)}
  />
</View>

<TouchableOpacity>
  <Text style={styles.forgot_button}>Forgot Password</Text>
</TouchableOpacity>


<TouchableOpacity onPress={()=>login()} style={styles.loginBtn}>
  <Text style={styles.loginText}>LOGIN</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image :{
    marginBottom: 40
 
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems:'center'
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    
  },
  loginBtn:
 {
   width:"80%",
   borderRadius:25,
   height:50,
   alignItems:"center",
   justifyContent:"center",
   marginTop:40,
   backgroundColor:"#6f6f6f",
 }
});
