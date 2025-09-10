import theme from '../../styles/theme';
import styled from 'styled-components/native';


export const styles = {
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
    width: '100%',
  },
  buttonStyle:{
    backgroundColor: 'transparent',
    paddingVertical: 10,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#929292',
  },
  inputText: {
    fontFamily: 'KdamThmorPro',
    color: '#929292',
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
  },
};

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.fundoPadrao};
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  font-family: 'KdamThmorPro';
  color: ${theme.colors.verde};
  margin-bottom: 20px;
  text-align: center;
`;

export const ProfileCard = styled.View`
  background-color: ${theme.colors.fundoPadrao};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

export const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 16px;
`;

export const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.white};
  margin-bottom: 8px;
`;

export const Email = styled.Text`
  font-size: 16px;
  color: ${theme.colors.white};
  margin-bottom: 8px;
`;

export const RoleBadge = styled.View<{ role: string }>`
  background-color: ${(props) => {
    switch (props.role) {
      case 'admin':
        return theme.colors.white + '20';
      default:
        return theme.colors.white + '20';
    }
  }};
  padding: 4px 12px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const RoleText = styled.Text`
  color: ${theme.colors.secondary};
  font-size: 14px;
  font-weight: 500;
`;

export const SpecialtyText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
  margin-top: 8px;
`;