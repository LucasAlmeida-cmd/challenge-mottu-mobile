import styled from 'styled-components/native';
import theme from '../../styles/theme';

export const styles = {
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
    inputError: {
    borderColor: 'red',
    borderWidth: 1
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5
  },
  summaryContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8
  },
  summaryText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  buttonDisabled: {
    backgroundColor: '#cccccc'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555'
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
};

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background-color: ${theme.colors.fundoPadrao};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: ${theme.colors.verde};
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 10px;
`;
