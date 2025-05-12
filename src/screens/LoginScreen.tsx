import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Input, Button, Text } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import theme from '../styles/theme';
import { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { color } from 'react-native-elements/dist/helpers';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation<LoginScreenProps['navigation']>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signIn({ email, password });
    } catch (err) {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginGoogle = async () => {
  };

  const handleLoginGitHub = async () => {
  };




  return (
    <Container>
      <Title>MotoFindr</Title>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
      />

      {error ? <ErrorText>{error}</ErrorText> : null}

      <Button
        title="Enviar"
        onPress={handleLogin}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.inputTextEnviar}
      />

      <Link to="/ForgotPassword" style={styles.pass}>
        Esqueceu a senha ?
      </Link>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        width: '100%',
        backgroundColor: 'transparent'
      }}>
        <View style={{
          flex: 1,
          height: 2,
          backgroundColor: '#ffffff'
        }} />
        <Text style={{
          marginHorizontal: 10,
          color: '#ffffff',
          fontSize: 10,
          fontFamily: 'KdamThmorPro'
        }}>OU</Text>
        <View style={{
          flex: 1,
          height: 2,
          backgroundColor: '#ffffff'
        }} />
      </View>

      <Button
        title="Entrar com o Google"
        onPress={handleLoginGoogle}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyleLogin}
        titleStyle={styles.inputTextEnviarLogin}
      />
      
      <Button
        title="Entrar com o Github"
        onPress={handleLoginGitHub}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyleLogin}
        titleStyle={styles.inputTextEnviarLogin}
      />



      <Text style={styles.hint}>
        Use as credenciais de exemplo:
      </Text>
      <Text style={styles.credentials}>
        Admin: admin/admin
      </Text>
    </Container>
  );
};

const styles = {
  input: {
    marginBottom: 15,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#929292',
    borderRadius: 10,
    backgroundColor: theme.colors.fundoPadrao,
  },
  inputText: {
    fontFamily: 'KdamThmorPro',
    color: '#929292',
    fontSize: 16,
    paddingLeft: 10,
  },
  inputTextEnviar: {
    fontFamily: 'KdamThmorPro',
    color: '#282828',
  },
  inputTextEnviarLogin: {
    fontFamily: 'KdamThmorPro',
    color: '#929292',
  },

  button: {
    marginTop: 10,
    width: '95%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.verde,
    paddingVertical: 10,
    height: 50,
    borderRadius: 10,
  },
  buttonStyleLogin:{
    backgroundColor: 'transparent',
    paddingVertical: 10,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#929292',
  },
  registerButton: {
    marginTop: 10,
    width: '100%',
  },
  registerButtonStyle: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
  pass: {
    textAlign: 'left' as const,
    color: theme.colors.verde,
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
  },
  hint: {
    marginTop: 20,
    textAlign: 'center' as const,
    color: '#929292',
  },
  credentials: {
    marginTop: 10,
    textAlign: 'center' as const,
    color: '#929292',
    fontSize: 12,
  },
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;    
  background-color: ${theme.colors.fundoPadrao};
`;

const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: ${theme.colors.verde};
  font-family: 'KdamThmorPro';
`;

const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 10px;
`;

export default LoginScreen; 
