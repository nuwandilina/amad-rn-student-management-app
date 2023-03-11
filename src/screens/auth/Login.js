import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ROUTES } from '../../constants';
import Logo from '../../assets/icons/LOGO.svg';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Portal, Provider, Dialog, Text, Button } from 'react-native-paper';

const Login = (props) => {
  // const {navigation} = props;
  const navigation = useNavigation();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState([]);
  const [studentID, setStudentID] = React.useState(0);

  const [visibleDialog, setvisibleDialog] = React.useState(false);
  const showDialog = () => {
    setvisibleDialog(true)
  };
  const hideDialog = () => {
    setvisibleDialog(false)
  };

  const btnLoginClick = () => {
    console.log("Im in");
    fetch(`http://192.168.1.3:3000/api/v1/auth`, {
      method: 'POST',
      body: JSON.stringify({
        username: userName,
        password: password
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((responseData) => {
        console.log(responseData.status);
        console.log(responseData.user);
        if (responseData.status == '200') {
          navigation.navigate(ROUTES.HOME)
        }
        else {
          showDialog();
        }
      });
    //.then(r => r.json().then(data => ({ status: r.status, body: data })))
  };

  return (

    <Provider><SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.wFull}>
          <View style={styles.row}>
            <Logo width={300} height={300} />
          </View>

          <Text style={styles.loginContinueTxt}>Login in to continue</Text>

          <TextInput style={styles.input}
            label="username"
            onChangeText={text => setUserName(text)}
            right={<TextInput.Icon icon="account-circle" />}
          />

          <TextInput style={styles.input}
            label="Password"
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
                onPress={btnLoginClick}
                activeOpacity={0.7}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/***************** FORGOT PASSWORD BUTTON *****************/}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.FORGOT_PASSWORD, {
                userId: 'X0001',
              })
            }
            style={styles.forgotPassBtn}>
            <Text style={styles.forgotPassText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}> Don't have an account? </Text>
          {/******************** REGISTER BUTTON *********************/}
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER)}>
            <Text style={styles.signupBtn}>Request</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Icon icon="alert-circle" size={30} color={COLORS.danger} />
          <Dialog.Content>
            <Text variant="bodyLarge">Invalid username or password</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </SafeAreaView></Provider>
  );
}

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.primary,
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    color: COLORS.gray,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    // borderWidth: 1,
    // borderColor: COLORS.grayLight,
    // padding: 15,
    // marginVertical: 10,
    // borderRadius: 5,
    // height: 55,
    // paddingVertical: 0,
    marginVertical: 5,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
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
  forgotPassText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  // footer
  footer: {
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  signupBtn: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  // utils
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mr7: {
    alignItems: 'center',
  },
});
