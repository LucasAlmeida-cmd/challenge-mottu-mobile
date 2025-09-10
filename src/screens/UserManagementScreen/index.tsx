import React, { useState, useCallback } from 'react';
import { ScrollView, ViewStyle, TextStyle, ActivityIndicator, View } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import Header from '../../components/Header';
import { MaterialIcons } from '@expo/vector-icons';

import {
  styles,
  Container,
  Title,
  UserCard,
  LoadingText,
  EmptyText,
  ButtonContainer
} from "../UserManagementScreen/style"

import { useApi } from '../../hooks/useApi';
import { patioService } from '../../services/patioService';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal'; // ajuste o caminho

type UserManagementScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserManagement'>;
};

interface Patio {
  idPatio: string;
  identificacao: string;
  largura: number;
  comprimento: number;
}

const UserManagementScreen: React.FC = () => {
  const { data: patios, loading, error, execute: refreshPatios } = useApi<Patio[]>(patioService.getPatios);
  const navigation = useNavigation<UserManagementScreenProps['navigation']>();
  const [deletingPatios, setDeletingPatios] = useState<Record<string, boolean>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatio, setSelectedPatio] = useState<Patio | null>(null);

  const openDeleteModal = (patio: Patio) => {
    setSelectedPatio(patio);
    setModalVisible(true);
  };

  const closeDeleteModal = () => {
    setModalVisible(false);
    setSelectedPatio(null);
  };

  const handleConfirmDelete = async (identificacao: string) => {
    setDeletingPatios(prev => ({ ...prev, [identificacao]: true }));
    try {
      await patioService.deletePatio(identificacao);
      await refreshPatios();
    } catch (error) {
      console.error("Erro ao deletar pátio:", error);
    } finally {
      setDeletingPatios(prev => ({ ...prev, [identificacao]: false }));
      closeDeleteModal();
    }
  };

  useFocusEffect(
    useCallback(() => {
      refreshPatios();
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
          icon={<MaterialIcons name="add" size={20} color="#282828" style={{ marginRight: 8 }} />}
          disabled={loading}
        />

        <Title>Pátios Cadastrados</Title>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <LoadingText>Carregando Pátios...</LoadingText>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <MaterialIcons name="error" size={40} color="#ff6b6b" />
            <Text style={styles.errorText}>Erro ao carregar pátios</Text>
            <Button
              title="Tentar Novamente"
              onPress={refreshPatios}
              buttonStyle={styles.retryButton}
              titleStyle={styles.retryButtonText}
            />
          </View>
        ) : !patios || patios.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="inbox" size={40} color="#929292" />
            <EmptyText>Nenhum pátio cadastrado</EmptyText>
          </View>
        ) : (
          patios.map((patio) => (
            <UserCard key={patio.idPatio} containerStyle={styles.patioCard}>
              <ListItem.Content>
                <ListItem.Title style={styles.patioIdentificacao as TextStyle}>
                  Identificação: {patio.identificacao}
                </ListItem.Title>

                <ListItem.Subtitle style={styles.patioDetail as TextStyle}>
                  Largura: {patio.largura}m
                </ListItem.Subtitle>

                <ListItem.Subtitle style={styles.patioDetail as TextStyle}>
                  Comprimento: {patio.comprimento}m
                </ListItem.Subtitle>

                <ListItem.Subtitle style={styles.patioDetail as TextStyle}>
                  Área Total: {(patio.largura * patio.comprimento).toFixed(2)}m²
                </ListItem.Subtitle>

                <ButtonContainer>
                  <Button
                    title={deletingPatios[patio.identificacao] ? "" : "Apagar"}
                    onPress={() => openDeleteModal(patio)}
                    containerStyle={{ width: '48%' }}
                    buttonStyle={styles.deleteButton}
                    titleStyle={styles.deleteButtonText}
                    disabled={deletingPatios[patio.identificacao]}
                    icon={
                      deletingPatios[patio.identificacao] ?
                        <ActivityIndicator size="small" color="#ffffff" /> :
                        <MaterialIcons name="delete" size={16} color="#ffffff" style={{ marginRight: 5 }} />
                    }
                  />

                  <Button
                    title="Atualizar"
                    onPress={() => {
                      navigation.navigate('EditPatio', {
                        idPatio: patio.idPatio,
                        identificacao: patio.identificacao,
                        largura: patio.largura,
                        comprimento: patio.comprimento,
                      });
                    }}
                    containerStyle={{ width: '48%' }}
                    buttonStyle={styles.updateButton}
                    titleStyle={styles.updateButtonText}
                    icon={<MaterialIcons name="edit" size={16} color="#ffffff" style={{ marginRight: 5 }} />}
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
          disabled={loading}
        />
      </ScrollView>

      {/* Modal de confirmação */}
      <ConfirmDeleteModal
        isVisible={modalVisible}
        patioIdentificacao={selectedPatio?.identificacao || null}
        onConfirm={handleConfirmDelete}
        onCancel={closeDeleteModal}
        loading={selectedPatio ? deletingPatios[selectedPatio.identificacao] : false}
      />
    </Container>
  );
};

export default UserManagementScreen;
