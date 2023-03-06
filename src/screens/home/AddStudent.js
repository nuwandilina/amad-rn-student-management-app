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
import { TextInput } from 'react-native-paper';

const AddStudent = props => {

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.txtContainer}>
        <TextInput style={styles.input}
          label="username"
          mode="outlined"
          onChangeText={text => setUserName(text)}
          right={<TextInput.Icon icon="account-circle" />}
        />

        <TextInput style={styles.input}
          label="Password"
          mode="outlined"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          right={<TextInput.Icon icon="eye" />}
        />

        <TextInput style={styles.input}
          label="username"
          mode="outlined"
          onChangeText={text => setUserName(text)}
          right={<TextInput.Icon icon="account-circle" />}
        />

        <TextInput style={styles.input}
          label="Password"
          mode="outlined"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          right={<TextInput.Icon icon="eye" />}
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
              style={styles.loginBtn}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

      </View>

      <View style={styles.bottomContainer}>

      </View>



    </SafeAreaView>
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
    margin:'5%'
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
});
