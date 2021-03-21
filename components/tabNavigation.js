import React,{useState,useEffect} from 'react';
import { Button, Text, View,TextInput,TouchableOpacity,SafeAreaView,FlatList,StyleSheet,Image } from 'react-native';
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen'
import Cart from './cart'
import AddBook from './Login'
import SearchBar from './SearchBar'
import { Alert } from 'react-native';


//let name=''
//let price = 0

/*
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <HomeScreen/>
    </View>
  );
}
*/


function CartScreen() {

  const [data , setData] = useState();

  const [miniData,setMiniData] = useState();
  
  
      
  
  const Book = ({ item }) => {
          
          
      return (
  
  
  
          <View style={{ flexDirection: 'row', width: 200, height: 180, borderColor: '#6f6f6f', borderRadius: 10, justifyContent: 'center', alignItems: 'center', top: 30 ,left:20}}>
  
              <View style={{ position: 'absolute', left: 10, top: 10 }}>
                  <Image style={{ width: 100, height: 100, borderRadius: 5, position: 'absolute' }}
                       source={{ uri: item.image }}
                      
                  />
  
              </View>
  
             
              <Text style={{ position: 'absolute', left: 15, top: -15 }} >{item.name}</Text>
              <Text style={{ position: 'absolute', left: 10, top: 115 }}>{`${item.price}$`}</Text>
              <Text style={{ position: 'absolute', left: 10, top: 135 }}>{item.purchasedDate}</Text>
  
          </View>
  
  
      )
  
  
  }
  
  
  const fetchBooks= async () => {
         
      let url = await 'http://192.168.1.112:5000/api/cart/'
      fetch(url)
      .then((response) => response.json())
      .then(json =>{ setData(json)
       //   console.log(data)
      })
      .catch((error) => console.error(error))
  };
  
      useEffect(() => {
          
          fetchBooks() 
        //  setMiniData(data)
        //  console.log(data)
      
      }, []);
  
      return (
          
      
  <SafeAreaView>
  
  
  <Text style={{ left: 170, top: 60, position: 'absolute', fontSize: 24 }}>Cart</Text>
  <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', position: 'absolute', top: 100 }}>
  
      <FlatList Style={{ justifyContent: 'space-between' }}
          data={data}
          
          numColumns={2}
          columnWrapperStyle={styles.row}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <Book item={item} />}
      >
  
      </FlatList>
  
  </View>
  </SafeAreaView>
  )
}

function SearchScreen() {
  return (
    <SearchBar/>
  );
  
}



const  PlusScreen= () => {

  const [name, setName] = useState('')
  const [price, setPrice] = useState(null)
  const [image, setImage] = useState('https://picsum.photos/200')

  const [isAdd,setIsAdd] = useState(false)

 // if(isAdd==true){
   
  const book = {
      'name': name,
      'image': 'https://picsum.photos/200',
      'price': price


  }



  const handelNameChange = (text) => {
      setName(text)
      //    console.log(name)
  }

  const handelPriceChange = (text) => {
      setPrice(text)
      //  console.log(price)
  }


  const insertBook = () => {
      // console.log(book)
     // setIsAdd(true)
       addBook(book)
  }

  const addBook = async (book) => {

    console.log(book)
      try {
          await fetch('http://192.168.1.112:5000/api/admin/insert', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  'name': book.name,
                  'image': book.image,
                  'price': book.price
              })              
          }).then((response) => response.json())
              .then((json) => {
                  Alert.alert('Book added successfully')
                  console.log(json)
              })
      } catch (error) {
          console.log(error)
      }
  }

  return (
      <View style={{ left: 50, top: 100, position: 'absolute', height: 400, width: 300, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 10 }}>

          <View style={{ marginBottom: 20, width: 200, height: 50, borderWidth: 1, borderRadius: 5, justifyContent: 'center' }}>
              <TextInput placeholder="Enter name" onChangeText={(text) => handelNameChange(text)} />
          </View>

          <View style={{ marginTop: 20, width: 200, height: 50, borderWidth: 1, borderRadius: 5, justifyContent: 'center' }}>
              <TextInput placeholder="Enter price" onChangeText={(text) => handelPriceChange(text)} />
          </View>
          <TouchableOpacity onPress={()=>addBook(book)} style={{ width: 100, height: 40, borderWidth: 1, backgroundColor: '#6f6f6f', borderRadius: 5, position: 'absolute', top: 300, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff' }}>Insert</Text>
          </TouchableOpacity> 

      </View>
  );
 // }
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  
  return (


    
    <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#e91e63',
    }}
       >
      <Tab.Screen  name="Home" component={HomeScreen} 
       options={{
        
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
      />

<Tab.Screen  name="Search" component={SearchBar} 
       options={{
        
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="text-search" color={color} size={size} />
        ),
      }}
      />
      
      <Tab.Screen name="Cart" component={CartScreen}
       options={{
        
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cart" color={color} size={size} />
        ),
      }}
      />

<Tab.Screen name="Plus" component={PlusScreen}
       options={{
       
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus" color={color} size={size} />
        ),
      }}
      />


    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}




/*import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react'
const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}*/

const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  },
  row: {
  flex: 1,
  justifyContent: "space-between",
  
  // flexBasis:'50%'
  }
  });