import React, { useState, useCallback } from 'react';

import { ScrollView, ViewStyle, TextStyle, Alert } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import Header from '../../components/Header';

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

type UserManagementScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'UserManagement'>;
};

interface Patio {
    idPatio: string;
    identificacao: string;
    largura: number;
    comprimento: number
}



const UserManagementScreen: React.FC = () => {
    const { data: patios, loading, error, execute: refreshPatios } = useApi<Patio[]>(patioService.getPatios);
    const navigation = useNavigation<UserManagementScreenProps['navigation']>();

    const handleDeletePatio = async (identificacao: string) => {
        console.log("entrou")
    try {
      await patioService.deletePatio(identificacao.trim());
      refreshPatios();
    } catch (error) {
      console.error('Erro ao deletar pátio:', error);
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
                />

                <Title>Pátios Cadastrados</Title>
                {loading ? (
                    <LoadingText>Carregando Pátios...</LoadingText>
                ) : !patios || patios.length === 0 ? (
                    <EmptyText>Nenhum pátio cadastrado</EmptyText>
                ) : (

                    patios.map((patio) => (
                        <UserCard key={patio.idPatio}
                            bottomDivider
                            containerStyle={{ backgroundColor: '#404040' }}>
                            <ListItem.Content>

                                <ListItem.Title style={styles.patioIdentificacao as TextStyle}>
                                    Identificação: {patio.identificacao}
                                </ListItem.Title>

                                <ListItem.Subtitle style={styles.patioLargura as TextStyle}>
                                    Largura: {patio.largura}m
                                </ListItem.Subtitle>

                                <ListItem.Subtitle style={styles.patioLargura as TextStyle}>
                                    Comprimento: {patio.comprimento}m
                                </ListItem.Subtitle>

                                <ListItem.Subtitle style={styles.patioLargura as TextStyle}>
                                    Área Total: {(patio.largura * patio.comprimento).toFixed(2)}m²
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
