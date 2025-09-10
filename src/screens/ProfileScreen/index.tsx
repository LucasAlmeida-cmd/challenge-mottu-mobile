import React from 'react';
import { Button, ListItem } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import Header from '../../components/Header';
import { styles, Container, ScrollView ,Title ,ProfileCard,Avatar, Name, Email, RoleBadge , RoleText, SpecialtyText} from './style'



type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<ProfileScreenProps['navigation']>();

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      default:
        return role;
    }
  };

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Meu Perfil</Title>

        <ProfileCard>
          <Avatar source={{ uri: user?.image || 'https://via.placeholder.com/150' }} />
          <Name>{user?.name}</Name>
          <Email>{user?.email}</Email>
          <RoleBadge role={user?.role || ''}>
            <RoleText>{getRoleText(user?.role || '')}</RoleText>
          </RoleBadge>
        </ProfileCard>

        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.inputText}
        />



      </ScrollView>
    </Container>
  );
};



export default ProfileScreen;
