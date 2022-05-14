import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './components/Task';
// import { Camera } from 'expo-camera';

import { BottomNavigation, Text } from 'react-native-paper';




export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  // const [hasPermission, setHasPermission] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);

  const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Music', icon: 'queue-music' },
    { key: 'albums', title: 'Albums', icon: 'album' },
    { key: 'recents', title: 'Recents', icon: 'history' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  


  const handleAddTask = () => {
    if (task.trim().length > 0) {
      setTaskItems([...taskItems, task]);
      setTask('');
      Keyboard.dismiss();
    }
  }

  const handleDeleteTask = (index) => {
    const newTaskItems = [...taskItems];
    newTaskItems.splice(index, 1);
    setTaskItems(newTaskItems);
  }



  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
//   componentWillMount() {
//     BackHandler.addEventListener('hardwareBackPress', this.backPressed);
//  }
 
//  componentWillUnmount() {
//     BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
//  }
 
//  backPressed = () => {
//    Alert.alert(
//      'Exit App',
//      'Do you want to exit?',
//      [
//        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
//        {text: 'Yes', onPress: () => BackHandler.exitApp()},
//      ],
//      { cancelable: false });
//      return true;
//  }


  return (
    <View style={styles.container}>

{/* <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera> */}
      
      {/* <TouchableOpacity  onPress={() => backPressed()}>
                <Text >Close</Text>
      </TouchableOpacity> */}
      {/* today task   */}
      <View style={styles.tasksWrapper}>


        <Text style={styles.sectionTitle}>Today's Tasks</Text>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

        <View style={styles.items}>
          
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => handleDeleteTask(index)}>
                <Task  text={item} />
              </TouchableOpacity>
            )
            
          })}
        </View>
      </ScrollView>
      </View>


      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <View></View>
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  space: {
    marginTop: 130,
  },
  items: {
    marginTop: 30,
    marginBottom:130,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
