import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, FlatList, SafeAreaView, TouchableOpacity, Alert, TextInput } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
//const exampleImage = require('../assets/images/c.png')
import { useIsFocused } from '@react-navigation/native';




export default function HomeScreen({ navigation }) {

    const [cartarray, setCart] = useState()

    const isFocused = useIsFocused();

    const deleteBook = async (item) => {

        try {

            await fetch(`http://192.168.1.112:5000/api/books/delete/${item.name}`, {
                method: 'DELETE'
            }).then((response) => response.json())
                .then((json) => {
                    console.log(json);
                })

        } catch (err) {
            console.log(err)
        }

        let name = item.name
        //setData(data.slice(data.indexOf(item.name,1)))
        //setData(data.filter(item=>item.name !== name))

        setData(data.filter((item) => (item.name !== name)))
    }


    const editBook = async (item) => {
        /*
                const fetchUpdate = () => {
                    fetch('http://192.168.1.112:5000/api/books/update/60508053d371cd3f304fbf74')
                }
        */

        return (
            Alert.prompt(
                "Enter price",
                "Enter your price",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "OK",
                        onPress: price => {
                            console.log("OK Pressed, price: " + price)
                            setPrice(price)
                            fetchUpdate(item);
                        }
                    }
                ],
                "secure-text"
            )
        )


    }

    const fetchUpdate = async (item) => {

        // fetch('')
        //  60508053d371cd3f304fbf74
        await fetch(`http://192.168.1.112:5000/api/books/update/${item._id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'price': price
            })
        }).then((response) => response.json())
            .then((json) => {
                console.log(json)
            })
            .catch((error) => {
                console.error(error);
            });


    }

    const cart = async (item) => {

        try {

            // console.log(item)
            await fetch('http://192.168.1.112:5000/api/cart/insert', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    purchasedDate: Date.now()

                })




            }).then((response) => response.json())
                .then((json) => {
                    console.log(json);
                })
        } catch (error) {
            console.log(error)
        }


        setCart([...cartarray, item])
        //     setCart(cartarray => [...cartarray, item]);
        console.log(cartarray)

    }

    const Book = ({ item }) => {

        const [changes,setChanges]= useState(false)

        return (



            <View style={{ flexDirection: 'row', width: 200, height: 180, borderColor: '#6f6f6f', borderRadius: 10, justifyContent: 'center', alignItems: 'center', top: 30, left: 20 }}>

                <View style={{ position: 'absolute', left: 10, top: 10 }}>
                    <Image style={{ width: 100, height: 100, borderRadius: 5, position: 'absolute' }}
                        source={{ uri: item.image }}

                    />

                </View>

    
    <TouchableOpacity onPress={() => deleteBook(item)} style={{ position: 'absolute', left: 120, top: 10 }}>
                    <MaterialCommunityIcons name="delete-forever" color='red' size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editBook(item)} style={{ position: 'absolute', left: 120, top: 60 }}>
                    <MaterialIcons name="edit" color='#6f6f6f' size={30} />
                </TouchableOpacity>
    
     
                
                <Text style={{ position: 'absolute', left: 15, top: -15 }} >{item.name}</Text>
                <Text style={{ position: 'absolute', left: 10, top: 115 }}>{`${item.price}$`}</Text>
                <TouchableOpacity onPress={() => cart(item)} style={{ position: 'absolute', top: 115, left: 90 }}>

                    <MaterialCommunityIcons name="cart" color='#6f6f6f' size={24} />
                </TouchableOpacity>
            </View>


        )


    }

    const [data, setData] = useState()
    const [price, setPrice] = useState();
    const [isAdmin, setIsAdmin] = useState();

    //  https://finetuneapp.com/skills
    // http://192.168.189.1:5000/api/books
    const fetchBooks = async () => {

        let url = 'http://192.168.1.112:5000/api/books'
        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
    };

    const login = async () => {


        let url = await `http://192.168.1.112:5000/api/users/${email}`
        fetch(url)
            .then((response) => response.json())
            .then(json => {
                setData(json)
                console.log(json)
                //console.log(data.isAdmin)

            })
            .catch((error) => console.error(error))


        if (data.isAdmin == true) {
            console.log("is admin")

        }

        //navigation.navigate(<tabNav/>)
    }

    useEffect(() => {

        fetchBooks()
        login();


        //console.log(data)

    }, []);


    return (

        <SafeAreaView style={{ marginTop: StatusBar.currentHeight || 0, }}>


            <Text style={{ left: 130, top: 60, position: 'absolute', fontSize: 24 }}>Book shop</Text>
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