import React, { useState, useEffect } from 'react';
import { Input, Button } from 'react-native-elements';
import { ViewStyle } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useApi } from '../../hooks/useApi';
import { patioService } from '../../services/patioService';
import { styles, Container, Title, ErrorText } from './style';

type EditPatioProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditPatio'>;
};

type EditPatioRouteProps = RouteProp<RootStackParamList, 'EditPatio'>;

interface Patio {
  idPatio: string;
  identificacao: string;
  largura: number;
  comprimento: number;
}

const EditPatioScreen: React.FC = () => {
  const navigation = useNavigation<EditPatioProps['navigation']>();
  const route = useRoute<EditPatioRouteProps>();

  const { idPatio, identificacao: identParam, largura: largParam, comprimento: compParam } = route.params;

  const { loading, error, execute: refreshPatios } = useApi<Patio[]>(patioService.getPatios);

  const [identificacao, setIdentificacao] = useState(identParam || '');
  const [largura, setLargura] = useState(largParam?.toString() || '');
  const [comprimento, setComprimento] = useState(compParam?.toString() || '');

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

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      const updatedPatio = {
        idPatio,
        identificacao: identParam,
        largura: parseFloat(largura),
        comprimento: parseFloat(comprimento),
      };


      await patioService.updatePatio(identParam, updatedPatio);

      await refreshPatios();
      alert('Pátio atualizado com sucesso!');
      navigation.goBack();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Erro ao atualizar pátio');
    }
  };

  return (
    <Container>
      <Title>Atualizar Pátio</Title>

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
        disabled={true}
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
        title="Salvar Alterações"
        onPress={handleUpdate}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.inputTextEnviar}
      />

      <Button
        title="Cancelar"
        onPress={() => navigation.goBack()}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyleVoltar}
        titleStyle={styles.inputTextVoltar}
      />
    </Container>
  );
};

export default EditPatioScreen;
