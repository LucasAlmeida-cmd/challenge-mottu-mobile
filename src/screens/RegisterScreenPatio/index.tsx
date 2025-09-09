import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Text } from 'react-native-elements';
import { ViewStyle, Alert, TouchableWithoutFeedback, Keyboard, View, ActivityIndicator, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useApi } from '../../hooks/useApi';
import { patioService } from '../../services/patioService';
import { styles, Container, Title, ErrorText } from './style';
import { MaterialIcons } from '@expo/vector-icons';

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
  const { data: patios, loading: loadingPatios, execute: refreshPatios } = useApi<Patio[]>(patioService.getPatios);
  const navigation = useNavigation<RegisterScreenProps['navigation']>();

  // Refs para gerenciar o foco
  const identificacaoRef = useRef<any>(null);
  const larguraRef = useRef<any>(null);
  const comprimentoRef = useRef<any>(null);

  const [identificacao, setIdentificacao] = useState('');
  const [largura, setLargura] = useState('');
  const [comprimento, setComprimento] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // Carregar a lista de pátios quando a tela for focada
  useEffect(() => {
    refreshPatios();
  }, []);

  // Focar no primeiro campo quando a tela carregar
  useEffect(() => {
    const timer = setTimeout(() => {
      if (identificacaoRef.current) {
        identificacaoRef.current.focus();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'identificacao':
        if (!value.trim()) {
          newErrors.identificacao = 'Identificação é obrigatória.';
        } else if (patios?.some(p => p.identificacao.toLowerCase() === value.trim().toLowerCase())) {
          newErrors.identificacao = 'Já existe um pátio com esta identificação.';
        } else {
          delete newErrors.identificacao;
        }
        break;
        
      case 'largura':
        if (!value || isNaN(Number(value)) || Number(value) <= 0) {
          newErrors.largura = 'Largura deve ser um número maior que 0.';
        } else if (Number(value) > 1000) {
          newErrors.largura = 'Largura não pode ser maior que 1000m.';
        } else {
          delete newErrors.largura;
        }
        break;
        
      case 'comprimento':
        if (!value || isNaN(Number(value)) || Number(value) <= 0) {
          newErrors.comprimento = 'Comprimento deve ser um número maior que 0.';
        } else if (Number(value) > 1000) {
          newErrors.comprimento = 'Comprimento não pode ser maior que 1000m.';
        } else {
          delete newErrors.comprimento;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const validateForm = () => {
    validateField('identificacao', identificacao);
    validateField('largura', largura);
    validateField('comprimento', comprimento);
    
    return Object.keys(errors).length === 0;
  };

  const formatNumber = (value: string) => {
    // Remove caracteres não numéricos, exceto ponto decimal
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Permite apenas um ponto decimal
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    
    return numericValue;
  };

  const handleRegister = async () => {
    Keyboard.dismiss();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const newPatio = {
        identificacao: identificacao.trim(),
        largura: parseFloat(largura),
        comprimento: parseFloat(comprimento),
      };

      await patioService.createPatio(newPatio);
      setSuccessModalVisible(true);
      
    } catch (err: any) {
      console.error(err);
      Alert.alert(
        'Erro',
        err.message || 'Erro ao cadastrar pátio. Verifique sua conexão e tente novamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessConfirm = () => {
    setSuccessModalVisible(false);
    navigation.goBack();
  };

  // Função para focar no próximo campo
  const focusNextField = (nextRef: any) => {
    if (nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          <Title>Cadastrar Pátio</Title>

          <TouchableOpacity 
            activeOpacity={1} 
            onPress={() => identificacaoRef.current && identificacaoRef.current.focus()}
          >
            <Input
              ref={identificacaoRef}
              placeholder="Identificação do pátio"
              value={identificacao}
              onChangeText={(text) => {
                setIdentificacao(text);
                validateField('identificacao', text);
              }}
              onBlur={() => validateField('identificacao', identificacao)}
              onSubmitEditing={() => focusNextField(larguraRef)}
              returnKeyType="next"
              autoCapitalize="words"
              containerStyle={styles.input}
              inputContainerStyle={[
                styles.inputContainer,
                errors.identificacao && styles.inputError,
              ]}
              inputStyle={styles.inputText}
              errorMessage={errors.identificacao}
              errorStyle={styles.errorText}
              leftIcon={<MaterialIcons name="badge" size={20} color="#929292" />}
              editable={!loading}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={1} 
            onPress={() => larguraRef.current && larguraRef.current.focus()}
          >
            <Input
              ref={larguraRef}
              placeholder="Largura (metros)"
              value={largura}
              onChangeText={(text) => {
                const formatted = formatNumber(text);
                setLargura(formatted);
                validateField('largura', formatted);
              }}
              onBlur={() => validateField('largura', largura)}
              onSubmitEditing={() => focusNextField(comprimentoRef)}
              returnKeyType="next"
              keyboardType="decimal-pad"
              containerStyle={styles.input}
              inputContainerStyle={[
                styles.inputContainer,
                errors.largura && styles.inputError,
              ]}
              inputStyle={styles.inputText}
              errorMessage={errors.largura}
              errorStyle={styles.errorText}
              leftIcon={<MaterialIcons name="straighten" size={20} color="#929292" />}
              editable={!loading}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={1} 
            onPress={() => comprimentoRef.current && comprimentoRef.current.focus()}
          >
            <Input
              ref={comprimentoRef}
              placeholder="Comprimento (metros)"
              value={comprimento}
              onChangeText={(text) => {
                const formatted = formatNumber(text);
                setComprimento(formatted);
                validateField('comprimento', formatted);
              }}
              onBlur={() => validateField('comprimento', comprimento)}
              onSubmitEditing={handleRegister}
              returnKeyType="done"
              keyboardType="decimal-pad"
              containerStyle={styles.input}
              inputContainerStyle={[
                styles.inputContainer,
                errors.comprimento && styles.inputError,
              ]}
              inputStyle={styles.inputText}
              errorMessage={errors.comprimento}
              errorStyle={styles.errorText}
              leftIcon={<MaterialIcons name="aspect-ratio" size={20} color="#929292" />}
              editable={!loading}
            />
          </TouchableOpacity>

          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>
              Área total: {largura && comprimento ? (parseFloat(largura) * parseFloat(comprimento)).toFixed(2) : '0.00'} m²
            </Text>
          </View>

          <Button
            title={loading ? "" : "Cadastrar Pátio"}
            onPress={handleRegister}
            loading={loading}
            disabled={loading || Object.keys(errors).length > 0}
            containerStyle={styles.button as ViewStyle}
            buttonStyle={[
              styles.buttonStyle,
              (loading || Object.keys(errors).length > 0) && styles.buttonDisabled
            ]}
            titleStyle={styles.inputTextEnviar}
            icon={loading ? <ActivityIndicator color="#282828" /> : undefined}
            TouchableComponent={TouchableOpacity}
          />

          <Button
            title="Voltar"
            onPress={() => navigation.goBack()}
            containerStyle={styles.button as ViewStyle}
            buttonStyle={styles.buttonStyleVoltar}
            titleStyle={styles.inputTextVoltar}
            disabled={loading}
            TouchableComponent={TouchableOpacity}
          />

          {/* Modal de Sucesso */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={successModalVisible}
            onRequestClose={handleSuccessConfirm}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <MaterialIcons name="check-circle" size={50} color="#4CAF50" />
                <Text style={styles.modalTitle}>Sucesso!</Text>
                <Text style={styles.modalMessage}>Pátio cadastrado com sucesso.</Text>
                <Button
                  title="OK"
                  onPress={handleSuccessConfirm}
                  buttonStyle={styles.modalButton}
                  titleStyle={styles.modalButtonText}
                  TouchableComponent={TouchableOpacity}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
};


export default RegisterScreen;