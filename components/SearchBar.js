import { SearchBar } from 'react-native-elements';
import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'


let da

const Search = ({ item }) => {

    // console.log(item)

    return (

        <View style={{ flexDirection: 'row', width: 200, height: 180, borderColor: '#6f6f6f', borderRadius: 10, justifyContent: 'center', alignItems: 'center', top: 30, left: 20 }}>

            <View style={{ position: 'absolute', left: 10, top: 10 }}>
                <Image style={{ width: 100, height: 100, borderRadius: 5, position: 'absolute' }}
                    source={{ uri: item.image }}

                />

            </View>


            <Text style={{ position: 'absolute', left: 15, top: -15 }} >{item.name}</Text>
            <Text style={{ position: 'absolute', left: 10, top: 115 }}>{`${item.price}$`}</Text>


        </View>

    )


}

export default class App extends React.Component {


    constructor(props) {
        super(props)
        this.state = { isLoading: true, search: '' };
        this.state = { arrayholder: [] }


    }



    search = text => {
        // console.log(text);
    };
    clear = () => {
        this.search.clear();
    };


    componentDidMount() {

        return fetch(`http://192.168.1.112:5000/api/books/:${this.state.search}`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        isLoading: false,
                        dataSource: responseJson,
                    },
                    function () {
                        const data = responseJson;

                        console.log(responseJson)
                    }
                );
            })
            .catch(error => {
                console.error(error);
            });

        this.setState({
            arrayholder: data
        })
    }
    search = text => {
        console.log(text);
    };
    clear = () => {
        this.search.clear();
    };
    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: newData,
            search: text,
        });
    }
    /*
     async SearchFilterFunction(text) {
    
        //this.setState({arrayholder:text})
    
          console.log(text)
        //passing the inserted text in textinput
     
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource:   text,
            search:text,
          });
    
         // console.log
         // const url = `http://192.168.1.112:5000/api/books/${text}`
       await   fetch(`http://192.168.1.112:5000/api/books/${text}`)
          .then(response => response.json())
          .then(responseJson => {
            this.setState(
              {
                isLoading: false,
                dataSource: responseJson,
              },
              function() {
                this.arrayholder = responseJson;
              console.log(this.arrayholder)
              }
            );
          })
          .catch(error => {
            console.error(error);
          });
    
        
        }
        
    
    
        /*
            fetchData = async (search) => {
        
                console.log(search+'baliaaaaaaaa')
            }
        */
    /*
     updateSearch = async (text) => {
       
         this.setState({ Search: text });
 
 console.log(this.state.search + "balia")
 
       //  console.log(text + "xsjksjdkjsdk")
         // await this.fetchData();
         try {
 
             await fetch(`http://192.168.1.112:5000/api/books/:${this.state.search}`)
                 .then((response) => response.json())
                 .then((responseJson) => {
                     // console.log(json);
                     this.setState({ data: responseJson })
                 })
                 .catch((error) => console.error(error))
         } catch (err) {
             console.log(err)
         }
 
 
     };
 
 */

    render() {

        if (this.state.isLoading) {
            //Loading View while data is loading
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>

            )
        }
        const { search } = this.state;

        return (


            <View style={{ top: 30 }}>
                <SearchBar
                    platform="ios"
                    placeholder="Type Here..."
                    round
                    searchIcon={{ size: 24 }}
                    onChangeText={text => this.SearchFilterFunction(text)}
                    onClear={text => this.SearchFilterFunction('')}
                    value={this.state.search}
                />

                <FlatList style={{ top: 90 }}
                    data={this.state.arrayholder}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => < Search item={item} />}
                    enableEmptySections={true}
                />
            </View>
        );
    }
}