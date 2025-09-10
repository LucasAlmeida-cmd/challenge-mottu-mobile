import styled from 'styled-components/native';
import theme from '../../styles/theme';

export const styles = {
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 10
  },
  buttonStyle: {
    backgroundColor: theme.colors.verde,
    paddingVertical: 10,
    height: 50,
    borderRadius: 10,
  },
  inputTextEnviar: {
    fontFamily: 'KdamThmorPro',
    color: '#282828',
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
  },
  actionButton: {
    marginTop: 8,
    width: '48%',
  },
  confirmButton: {
    backgroundColor: theme.colors.success,
    paddingVertical: 8,
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 8,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  specialty: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  },
  dateTime: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
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
  font-size: 24px;
  font-family: 'KdamThmorPro';
  font-weight: bold;
  color: ${theme.colors.verde};
  margin-bottom: 30px;
  text-align: center;
  white-space: nowrap;
`;
