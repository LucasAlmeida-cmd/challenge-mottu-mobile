import theme from '../../styles/theme';
import styled from 'styled-components/native';

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
  inputTextEnviar: {
    fontFamily: 'KdamThmorPro',
    color: '#282828',
  },
  inputTextEnviarLogin: {
    fontFamily: 'KdamThmorPro',
    color: '#929292',
  },

  button: {
    marginTop: 10,
    width: '95%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.verde,
    paddingVertical: 10,
    height: 50,
    borderRadius: 10,
  },
  buttonStyleLogin:{
    backgroundColor: 'transparent',
    paddingVertical: 10,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#929292',
  },
  registerButton: {
    marginTop: 10,
    width: '100%',
  },
  registerButtonStyle: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
  pass: {
    textAlign: 'left' as const,
    color: theme.colors.verde,
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
  },
  hint: {
    marginTop: 20,
    textAlign: 'center' as const,
    color: '#929292',
  },
  credentials: {
    marginTop: 10,
    textAlign: 'center' as const,
    color: '#929292',
    fontSize: 12,
  },
};

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;    
  background-color: ${theme.colors.fundoPadrao};
`;

export const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: ${theme.colors.verde};
  font-family: 'KdamThmorPro';
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 10px;
`;