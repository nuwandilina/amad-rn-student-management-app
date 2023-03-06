import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ROUTES } from '../../constants';
import Logo from '../../assets/icons/LOGO.svg';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Provider, Portal, Dialog, Button } from 'react-native-paper';

const AddStudent = props => {
  const navigation = useNavigation();
  const [studentName, setStudentName] = React.useState("");
  const [studentAddress, setStudentAddress] = React.useState("");
  const [registrationDate, setRegistrationDate] = React.useState("");
  const [studentcourse, setStudentcourse] = React.useState("");
  const [studentimage, setStudentimage] = React.useState("");

  const [visibleDialog, setvisibleDialog] = React.useState(false);
  const showDialog = () => {
    setvisibleDialog(true)
  };
  const hideDialog = () => {
    setvisibleDialog(false)
  };

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
      .then((responseData) => {
        if (responseData.status == '200') {
          showDialog();
        }
      });
  }

  const clearForm = () => {
    navigation.navigate('Home');
  }

  return (
    <Provider>
      <SafeAreaView style={styles.main}>
        <View style={styles.txtContainer}>
          <TextInput style={styles.txtBox}
            label="Name"
            mode='outlined'
            onChangeText={text => setStudentName(text)}
          />
          <TextInput style={styles.txtBox}
            label="Address"
            mode='outlined'
            onChangeText={text => setStudentAddress(text)}
          />
          <TextInput style={styles.txtBox}
            label="Registered Date"
            mode='outlined'
            onChangeText={text => setRegistrationDate(text)}
          />
          <TextInput style={styles.txtBox}
            label="Course"
            mode='outlined'
            onChangeText={text => setStudentcourse(text)}
          />

          <View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={[COLORS.gradientForm, COLORS.primary]}
              style={styles.linearGradient}
              start={{ y: 0.0, x: 0.0 }}
              end={{ y: 1.0, x: 0.0 }}>
              {/******************** LOGIN BUTTON *********************/}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={saveStudent}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Save</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

        </View>

        <View style={styles.bottomContainer}>

        </View>

        <Portal>
          <Dialog visible={visibleDialog} onDismiss={hideDialog}>
            <Dialog.Icon icon="check-circle" size={30} color={ COLORS.bootstrapSuccess} />
            <Dialog.Content>
              <Text variant="bodyLarge">Student successfully saved</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => clearForm()}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </SafeAreaView>
    </Provider>
  );
};

export default AddStudent;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
  },
  txtContainer: {
    flex: 0.8,
    margin: '5%'
  },
  bottomContainer: {
    flex: 0.2,
    flexDirection: 'column',
  },
  loginBtnWrapper: {
    height: 55,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    margin: '5%'
  },
  linearGradient: {
    width: '100%',
    borderRadius: 50,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
  },
  txtBox: {
    borderRadius: 10,
    width: '100%',
  },
});
