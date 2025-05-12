import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, ViewStyle, TextStyle } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import theme from '../styles/theme';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                    onPress={() => handleDeletePatio(patio.id)}
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

const styles = {
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
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
  inputTextVoltar: {
    fontFamily: 'KdamThmorPro',
    color: '#929292',
  },
  inputTextEnviar: {
    fontFamily: 'KdamThmorPro',
    color: '#282828',
  },
  backButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
  actionButton: {
    marginTop: 8,
    width: '48%',
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    fontFamily: 'KdamThmorPro',
    color: '#000000',
    fontSize: 16,
  },
  patioIdentificacao: {
    fontSize: 18,
    fontFamily: 'KdamThmorPro',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  patioLargura: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'KdamThmorPro',
    marginBottom: 4,
  },

  
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.fundoPadrao};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  font-family: 'KdamThmorPro';
  color: ${theme.colors.verde};
  margin-bottom: 20px;
  text-align: center;
`;

const UserCard = styled(ListItem)`
  background-color: #404040;
  border-radius: 10px;
  border-color: #929292;
  margin-bottom: 10px;
  padding: 15px;
  border-width: 1px;
`;

const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;


const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

export default UserManagementScreen; 
