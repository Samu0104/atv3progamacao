import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Input, ListItem } from '@rneui/themed';
import React from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

// Criação do navegador em pilha
const Stack = createStackNavigator();

// Dados de exemplo para contatos
const contactsData = [
  { id: '1', name: 'Marcos Andrade', phone: '81 988553424' },
  { id: '2', name: 'Patricia Tavares', phone: '81 998765332' },
  { id: '3', name: 'Rodrigo Antunes', phone: '81 987765525' },
];

// Componente principal que contém a navegação
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ListaContato" component={ListaContatoScreen} options={{ title: 'Lista de Contatos' }} />
        <Stack.Screen name="RegistrarUser" component={RegistrarUserScreen} options={{ title: 'Cadastro de Usuários' }} />
        <Stack.Screen name="RegistrarContato" component={RegistrarContatoScreen} options={{ title: 'Cadastro de Contato' }} />
        <Stack.Screen name="EditarContato" component={EditarContatoScreen} options={{ title: 'Alteração/Exclusão de Contatos' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Tela de Login
function LoginScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>LOGIN</Text>
          
          <Input
            placeholder="login"
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />

          <Input
            placeholder="senha"
            secureTextEntry
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          
          <Button 
            title="Login" 
            buttonStyle={styles.primaryButton}
            onPress={() => navigation.navigate('ListaContato')}
          />
          
          <Button 
            title="Cadastre-se" 
            type="outline"
            buttonStyle={styles.secondaryButton}
            titleStyle={styles.secondaryButtonText}
            onPress={() => navigation.navigate('RegistrarUser')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Tela de Lista de Contatos
function ListaContatoScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <ListItem 
      bottomDivider
      onPress={() => navigation.navigate('EditarContato', { contact: item })}
    >
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.phone}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>LISTA DE CONTATOS</Text>
      
      <FlatList
        data={contactsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      
      <Button 
        title="Adicionar Contato"
        buttonStyle={styles.addButton}
        onPress={() => navigation.navigate('RegistrarContato')}
      />
    </SafeAreaView>
  );
}

// Tela de Cadastro de Usuários
function RegistrarUserScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.screenTitle}>CADASTRO DE USUÁRIOS</Text>
        
        <Text style={styles.sectionTitle}>Usuario</Text>
        
        <Input
          placeholder="nome"
          containerStyle={styles.inputContainer}
        />
        
        <Input
          placeholder="cpf"
          containerStyle={styles.inputContainer}
        />
        
        <Input
          placeholder="email"
          containerStyle={styles.inputContainer}
        />
        
        <Input
          placeholder="senha"
          secureTextEntry
          containerStyle={styles.inputContainer}
        />
        
        <Button 
          title="Salvar" 
          buttonStyle={styles.primaryButton}
          onPress={() => navigation.navigate('ListaContato')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Tela de Cadastro de Contato
function RegistrarContatoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.screenTitle}>CADASTRO DE CONTATO</Text>
        
        <Text style={styles.sectionTitle}>Contato</Text>
        
        <Input
          placeholder="Nome"
          containerStyle={styles.inputContainer}
        />
        
        <Input
          placeholder="Email"
          containerStyle={styles.inputContainer}
        />
        
        <Input
          placeholder="Telefone"
          containerStyle={styles.inputContainer}
        />
        
        <Button 
          title="Salvar" 
          buttonStyle={styles.primaryButton}
          onPress={() => navigation.navigate('ListaContato')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Tela de Edição/Exclusão de Contatos
function EditarContatoScreen({ route, navigation }) {
  const contact = route.params?.contact || {
    id: '1',
    name: 'Marco Andrade',
    email: 'mand@gmail.com',
    phone: '81 988553424'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.screenTitle}>ALTERAÇÃO/EXCLUSÃO DE CONTATOS</Text>
        
        <Text style={styles.sectionTitle}>Contato</Text>
        
        <Input
          value={contact.name}
          containerStyle={styles.inputContainer}
        />
        
        <Input
          value={contact.email}
          containerStyle={styles.inputContainer}
        />
        
        <Input
          value={contact.phone}
          containerStyle={styles.inputContainer}
        />
        
        <View style={styles.buttonGroup}>
          <Button 
            title="Alterar" 
            buttonStyle={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => navigation.goBack()}
          />
          <Button 
            title="Excluir" 
            buttonStyle={[styles.actionButton, { backgroundColor: '#f44336' }]}
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos (mantidos iguais)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    paddingHorizontal: 10,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  secondaryButton: {
    borderColor: '#4CAF50',
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  secondaryButtonText: {
    color: '#4CAF50',
  },
  addButton: {
    backgroundColor: '#2196F3',
    margin: 20,
    borderRadius: 5,
  },
  list: {
    width: '100%',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    width: '48%',
    borderRadius: 5,
    paddingVertical: 12,
  },
});

