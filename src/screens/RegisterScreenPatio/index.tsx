import React, { useState } from 'react';
import { Input, Button } from 'react-native-elements';
import { ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useApi } from '../../hooks/useApi';
import { patioService } from '../../services/patioService';
import { styles, Container, Title, ErrorText } from './style';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RegisterPatio'>;
};

interface Patio {
  idPatio: string;
  identificacao: string;
  largura: number;
  comprimento: number;
}

const RegisterScreen: React.FC = () => {
  const { data: patios, loading, error, execute: refreshPatios } =
    useApi<Patio[]>(patioService.getPatios);

  const navigation = useNavigation<RegisterScreenProps['navigation']>();

  const [identificacao, setIdentificacao] = useState('');
  const [largura, setLargura] = useState('');
  const [comprimento, setComprimento] = useState('');

  // erros por campo
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!identificacao.trim()) {
      newErrors.identificacao = 'Identificação é obrigatória.';
    }

    if (!largura || isNaN(Number(largura)) || Number(largura) <= 0) {
      newErrors.largura = 'Largura deve ser um número maior que 0.';
    }

    if (!comprimento || isNaN(Number(comprimento)) || Number(comprimento) <= 0) {
      newErrors.comprimento = 'Comprimento deve ser um número maior que 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const newPatio = {
        identificacao: identificacao.trim(),
        largura: parseFloat(largura),
        comprimento: parseFloat(comprimento),
      };

      await patioService.createPatio(newPatio);
      await refreshPatios();

      alert('Pátio cadastrado com sucesso!');
      navigation.goBack();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Erro ao cadastrar pátio');
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
        inputContainerStyle={[
          styles.inputContainer,
          errors.identificacao && { borderColor: 'red' },
        ]}
        inputStyle={styles.inputText}
        errorMessage={errors.identificacao}
      />

      <Input
        placeholder="Largura"
        value={largura}
        onChangeText={setLargura}
        keyboardType="numeric"
        containerStyle={styles.input}
        inputContainerStyle={[
          styles.inputContainer,
          errors.largura && { borderColor: 'red' },
        ]}
        inputStyle={styles.inputText}
        errorMessage={errors.largura}
      />

      <Input
        placeholder="Comprimento"
        value={comprimento}
        onChangeText={setComprimento}
        keyboardType="numeric"
        containerStyle={styles.input}
        inputContainerStyle={[
          styles.inputContainer,
          errors.comprimento && { borderColor: 'red' },
        ]}
        inputStyle={styles.inputText}
        errorMessage={errors.comprimento}
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

export default RegisterScreen;
