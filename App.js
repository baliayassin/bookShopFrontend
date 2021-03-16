import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigation from './components/tabNavigation'
import HomeScreen from './components/HomeScreen'
import Login from './components/Login'

export default function App() {
  return (
    <TabNavigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
