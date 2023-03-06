import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS, ROUTES } from '../../constants';
import { TextInput, List, MD3Colors, Avatar, Modal, Portal, Text, Button, Provider, Appbar, Dialog } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

type Student = {
  std_id: int,
  name: String,
  address: String,
  registered_date: String,
  course: String,
  image: String
}

const Home = () => {
  const navigation = useNavigation();
  const [students, setStudents] = React.useState([]);
  const [studentName, setStudentName] = React.useState("");
  const [studentAddress, setStudentAddress] = React.useState("");
  const [registrationDate, setRegistrationDate] = React.useState("");
  const [studentcourse, setStudentcourse] = React.useState("");
  const [studentimage, setStudentimage] = React.useState("");
  const [studentID, setStudentID] = React.useState(0);

  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false)
  };

  const [visibleDialog, setvisibleDialog] = React.useState(false);
  const showDialog = (studentID) => {
    setStudentID(studentID)
    setvisibleDialog(true)
  };
  const hideDialog = () => {
    setvisibleDialog(false)
  };

  const GetAllStudents = async () => {
    try {
      const response = await fetch('http://192.168.1.3:3000/api/v1/student/');
      const json = await response.json();
      await setStudents(json);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  React.useEffect(() => {
    GetAllStudents();
  }, []);


  const saveStudent = () => {
    fetch('http://192.168.1.3:3000/api/v1/student/', {
      method: 'POST',
      body: JSON.stringify({
        std_id: 0,
        name: studentName,
        address: studentAddress,
        registered_date: registrationDate,
        course: studentcourse,
        image: studentimage
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    GetAllStudents();
  }

  const deleteStudent = () => {
    // fetch(`http://192.168.1.3:3000/api/v1/student/${studentID}`, {
    //   method: 'DELETE',
    // })
    //   .then((response) => response.json())
    //   .then((json) => JSON.stringify(json));

    fetch(`http://192.168.1.3:3000/api/v1/student/${studentID}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((responseData) => {
        //console.log(JSON.stringify(responseData));
        //console.log(responseData.status);
        if (responseData.status == '200') {
          setvisibleDialog(false);
          GetAllStudents();
        }
      });
  }

  return (
    <Provider>
      <View style={styles.homeContainer}>

        <View style={styles.searchArea}>
          <TextInput style={styles.input}
            label="search student"
            mode='outlined'
          />

          <LinearGradient
            colors={[COLORS.gradientForm, COLORS.primary]}
            style={styles.linearGradient}
            start={{ y: 0.0, x: 0.0 }}
            end={{ y: 1.0, x: 0.0 }}>
            {/******************** LOGIN BUTTON *********************/}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('AddStudent')}
            >
              <MaterialCommunityIcons name="plus" color={COLORS.white} size={30} />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <ScrollView style={styles.studentListArea}>

          {students.map(student => (
            <List.Item
              key={student.std_id}
              title={student.name}
              description={student.address}
              left={props => <TouchableOpacity><Avatar.Text size={40} label={student.name.substring(0, 2).toUpperCase()} /></TouchableOpacity>}
              right={props => <TouchableOpacity style={styles.deleteBtn} onPress={() => showDialog(student.std_id)}><MaterialCommunityIcons name="delete-circle" color={COLORS.bootstrapDanger} size={40}/></TouchableOpacity>}
            />
          ))}

        </ScrollView>

        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modelContainerStyle}>

            <Appbar.Header style={styles.appBar}>
              <Appbar.Content title="Add new student" style={styles.cardTitle} />
            </Appbar.Header>

            <TextInput style={styles.addStudentModelTxt}
              label="Name"
              mode='outlined'
              onChangeText={text => setStudentName(text)}
            />
            <TextInput style={styles.addStudentModelTxt}
              label="Address"
              mode='outlined'
              onChangeText={text => setStudentAddress(text)}
            />
            <TextInput style={styles.addStudentModelTxt}
              label="Registered Date"
              mode='outlined'
              onChangeText={text => setRegistrationDate(text)}
            />
            <TextInput style={styles.addStudentModelTxt}
              label="Course"
              mode='outlined'
              onChangeText={text => setStudentcourse(text)}
            />

            <Button icon="content-save" mode="contained" style={styles.addStudentBtn} onPress={saveStudent}>
              Save
            </Button>

          </Modal>
        </Portal>

        <Portal>
          <Dialog visible={visibleDialog} onDismiss={hideDialog}>
            <Dialog.Icon icon="chat-question" size={30} color={COLORS.danger} />
            <Dialog.Content>
              <Text variant="bodyLarge">Are you sure you want to delete this student ?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={deleteStudent}><Text style={{ color: COLORS.danger }}>Yes</Text></Button>
              <Button onPress={hideDialog}>No</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </View>
    </Provider>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: '3%',
    backgroundColor: COLORS.white
  },
  searchArea: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    flex: 0.1
  },
  input: {
    borderRadius: 10,
    width: '78%',
    margin: '2%',
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
  },
  linearGradient: {
    width: '10%',
    height: '70%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '1%',
    marginLeft: '1%'
  },
  studentListArea: {
    flex: 0.9,
    marginTop:'2%',
    marginLeft: '3%'
  },
  modelContainerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: '5%',
    borderRadius: 10,
    alignItems: 'center'
  },
  addStudentModelTxt: {
    borderRadius: 10,
    width: '100%',
  },
  addStudentBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 55,
    margin: '2%',
    marginTop: '3%',
    backgroundColor: COLORS.bootstrapPrimary,
  },
  deleteBtn: {
    
  },
  appBar: {
    backgroundColor: COLORS.titleBarAddStudent,
    width: '100%',
    justifyContent: 'center'
  },
  cardTitle: {
    fontSize: 21,
    textAlign: 'center',
    color: COLORS.gray,
    marginBottom: 16,
    fontWeight: 'bold',
  }
});
