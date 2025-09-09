import styled from 'styled-components/native';
import theme from '../../styles/theme';
import {ListItem } from 'react-native-elements';

export const styles = {
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
  loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    errorText: {
        color: '#ff6b6b',
        marginVertical: 10,
        textAlign: 'center'
    },
    retryButton: {
        backgroundColor: '#ff6b6b',
        paddingVertical: 10,
        borderRadius: 8
    },
    retryButtonText: {
        fontSize: 14
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },
    patioCard: {
        backgroundColor: '#404040',
        borderRadius: 10,
        marginBottom: 15,
        padding: 15
    },
    patioDetail: {
        color: '#cccccc',
        marginBottom: 5
    },
    updateButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8
    },
    updateButtonText: {
        fontSize: 14
    }

  
};

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.fundoPadrao};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  font-family: 'KdamThmorPro';
  color: ${theme.colors.verde};
  margin-bottom: 20px;
  text-align: center;
`;

export const UserCard = styled(ListItem)`
  background-color: #404040;
  border-radius: 10px;
  border-color: #929292;
  margin-bottom: 10px;
  padding: 15px;
  border-width: 1px;
`;

export const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;


export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;