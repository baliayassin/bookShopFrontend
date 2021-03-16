import React ,{useState,useEffect} from 'react'
import { View, Text ,TouchableOpacity,SafeAreaView ,StyleSheet,FlatList,Image} from 'react-native'

export default function cart() {

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
        console.log(data)
    })
    .catch((error) => console.error(error))
};

    useEffect(() => {
        
        fetchBooks() 
      //  setMiniData(data)
        console.log(data)
    
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
