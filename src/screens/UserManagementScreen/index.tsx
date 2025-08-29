import React, { useState } from 'react';

import { ScrollView, ViewStyle, TextStyle } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    styles,
    Container,
    Title,
    UserCard,
    LoadingText,
    EmptyText,
    ButtonContainer
} from "../UserManagementScreen/style"

type UserManagementScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserManagement'>;
};

interface Patio {
  id: string;
  identificacao: string;
  largura: string;
  comprimento: string;
}

interface StyledProps {
  role: string;
}

const UserManagementScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<UserManagementScreenProps['navigation']>();
  const [patios, setPatios] = useState<Patio[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPatios = async () => {
    try {
      const storedPatios = await AsyncStorage.getItem('@MotoFindr:patios');
      if (storedPatios) {
        const allPatios: Patio[] = JSON.parse(storedPatios);
        const filteredPatios = allPatios;
        setPatios(filteredPatios);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatio = async (patioId: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem('@MotoFindr:patios');
      if (storedUsers) {
        const allPatios: Patio[] = JSON.parse(storedUsers);
        const updatedPatios = allPatios.filter(u => u.id !== patioId);
        await AsyncStorage.setItem('@MotoFindr:patios', JSON.stringify(updatedPatios));
        loadPatios(); // Recarrega a lista
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      loadPatios();
    }, [])
  );

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Button
          title="Inserir Pátio"
          onPress={() => navigation.navigate('RegisterPatio')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.inputTextEnviar}
        />

        <Title>Pátios Cadastrados</Title>

        {loading ? (
          <LoadingText>Carregando Pátios...</LoadingText>
        ) : patios.length === 0 ? (
          <EmptyText>Nenhum pátio cadastrado</EmptyText>
        ) : (
          patios.map((patio) => (

            <UserCard key={patio.id} 
            bottomDivider
            containerStyle={{ backgroundColor: '#404040'}}>
              <ListItem.Content>
                <ListItem.Title style={styles.patioIdentificacao as TextStyle}>
                  {patio.identificacao}
                </ListItem.Title>

                <ListItem.Subtitle style={styles.patioLargura as TextStyle}>
                  Largura: {patio.largura}
                </ListItem.Subtitle>

                <ListItem.Subtitle style={styles.patioLargura as TextStyle}>
                  Comprimento: {patio.comprimento}
                </ListItem.Subtitle>

                <ButtonContainer>
                  <Button
                    title="Apagar"
                    onPress={() => handleDeletePatio(patio.identificacao)}
                    containerStyle={{ width: 'auto' }}
                    buttonStyle={styles.deleteButton}
                    titleStyle={styles.deleteButtonText}
                  />
                </ButtonContainer>
              </ListItem.Content>
            </UserCard>

          ))
        )}

        <Button
          title="Voltar"
          onPress={() => navigation.navigate('AdminDashboard')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyleVoltar}
          titleStyle={styles.inputTextVoltar}
        />
      </ScrollView>
    </Container>
  );
};


export default UserManagementScreen; 
