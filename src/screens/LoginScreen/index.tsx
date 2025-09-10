import React, { useState } from 'react';
import { Input, Button, Text } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import {styles, Container, Title, ErrorText } from './styles';

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
    setLoading(true);
    // Simulação de login com Google
    setTimeout(() => {
      setLoading(false);
      setError('Login com Google ainda não implementado');
    }, 1500);
  };

  const handleLoginGitHub = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('Login com GitHub ainda não implementado');
    }, 1500);
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



export default LoginScreen; 