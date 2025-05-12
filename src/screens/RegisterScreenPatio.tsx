import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Input, Button, Text } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import theme from '../styles/theme';
import { ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RegisterPatio'>;
};

const RegisterScreen: React.FC = () => {
  const { registerPatio } = useAuth();
  const navigation = useNavigation<RegisterScreenProps['navigation']>();
  const [identificacao, setIdentificacao] = useState('');
  const [largura, setLargura] = useState('');
  const [comprimento, setComprimento] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError('');

      if (!identificacao || !largura || !comprimento) {
        setError('Por favor, preencha todos os campos');
        return;
      }

      await registerPatio({
        identificacao,
        largura,
        comprimento,
      });
      navigation.navigate('UserManagement');
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Inserir Pátio</Title>

      <Input
        placeholder="Identificação"
        value={identificacao}
        onChangeText={setIdentificacao}
        autoCapitalize="words"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
      />

      <Input
        placeholder="Largura"
        value={largura}
        onChangeText={setLargura}
        autoCapitalize="words"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
      />

      <Input
        placeholder="Comprimento"
        value={comprimento}
        onChangeText={setComprimento}
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
      />

      {error ? <ErrorText>{error}</ErrorText> : null}

      <Button
        title="Enviar"
        onPress={handleRegister}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.inputTextEnviar}
      />

      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyleVoltar}
        titleStyle={styles.inputTextVoltar}
      />
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
  button: {
    marginTop: 10,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.verde,
    paddingVertical: 10,
    height: 50,
    borderRadius: 10,
  },
  buttonStyleVoltar: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#929292',
  },
  inputTextEnviar: {
    fontFamily: 'KdamThmorPro',
    color: '#282828',
  },
  inputTextVoltar: {
    fontFamily: 'KdamThmorPro',
    color: '#929292',
  },
  backButton: {
    marginTop: 10,
    width: '100%',
  },
  backButtonStyle: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background-color: ${theme.colors.fundoPadrao};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: ${theme.colors.verde};
`;

const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 10px;
`;

export default RegisterScreen;  