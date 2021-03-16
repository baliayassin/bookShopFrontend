import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput
} from 'react-native';
import filter from 'lodash.filter';


export default function Search() {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const [query, setQuery] = useState('');
const [fullData, setFullData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
    
        fetch('http://192.168.1.112:5000/api/books/react')
          .then(response => response.json())
          .then(results => {
            setData(results);
            setFullData(response.results);
            setIsLoading(false);
            console.log(data)
          })
          .catch(err => {
            setIsLoading(false);
            setError(err);
          });
      }, []);


      function renderHeader() {
        return (
          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              marginVertical: 10,
              borderRadius: 20
            }}
          >
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              value={query}
              onChangeText={queryText => handleSearch(queryText)}
              placeholder="Search"
              style={{ backgroundColor: '#fff', paddingHorizontal: 20,width:300 }}
            />
          </View>
        );
      }


      const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(fullData, user => {
          return contains(user, formattedQuery);
        });
        setData(filteredData);
        setQuery(text);

        if (formattedQuery.includes(query))  {
            return true;
          }
        
          return false;
        
      };
      
     
   
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Search Book</Text>
        <FlatList
          data={data}
          keyExtractor={item => item.name}
          ListHeaderComponent={renderHeader}
        />
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center'
      },
      text: {
        fontSize: 20,
        color: '#101010',
        marginTop: 60,
        fontWeight: '700'
      },
      listItem: {
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        flexDirection: 'row'
      },
      coverImage: {
        width: 100,
        height: 100,
        borderRadius: 8
      },
      metaInfo: {
        marginLeft: 10
      },
      title: {
        fontSize: 18,
        width: 200,
        padding: 10
      }
  });