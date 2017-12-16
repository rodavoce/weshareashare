import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './FatcaStyle';
import { Container, Content, Card, CardItem, Body, Text } from 'native-base';
import RadioButtonsForm from '@components/RadioButtonsForm';
import Toast from 'react-native-root-toast';
import { ApplicationStyles } from '@theme/';

class FatcaView extends Component {
  static navigationOptions = () => ({
    title: 'Invista',
  });

  handleSubmit = () => {
    const choice = this.child.retrieveValues();

    if (this.props.submit) {
      this.props.submit({ FATCA: choice }, this.props.session)
        .then(() => {
          if (this.props.onSuccessfulSubmit) {
            this.props.onSuccessfulSubmit(choice);
          } else {
            Toast.show('FATCA aceite com sucesso.', ApplicationStyles.toastSuccess);
          }
          return true;
        }).catch(() => {
          Toast.show('Não foi possível aceitar o FATCA', ApplicationStyles.toastError);
        });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Content>
          <Card style={styles.messageBackground}>
            <CardItem style={styles.messageCard}>
              <Body>
                <Text>
                  {this.props.question}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <RadioButtonsForm onRef={(ref) => (this.child = ref)} answers={this.props.options} />
          <View style={styles.buttonSet}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigate('FatcaInfo');
              }}
            >
              <Text style={{ justifyContent: 'center' }}>Saber mais</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleSubmit}
            >
              <Text style={{ justifyContent: 'center' }}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

/* Export Component ==================================================================== */
export default FatcaView;