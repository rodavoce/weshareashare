import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './SubscriptionStyle';
import SubscriptionFields from './SubscriptionFields';
import { Container, Content, Card, CardItem, Body, Text } from 'native-base';
import Toast from 'react-native-root-toast';
import { ApplicationStyles } from '@theme/';

class SubscriptionView extends Component {
  static navigationOptions = ({ }) => ({
    title: 'Invista',
  });

  handleSubmit = () => {
    const { navigate } = this.props.navigation;
    const choices = this.child.retrieveValues();

    if (this.props.submit) {
      this.props.submit({ subscription: choices }, this.props.session)
        .then(() => {
          if (this.props.onSuccessfulSubmit) {
            this.props.onSuccessfulSubmit(choices);
          } else {
            Toast.show('Subscrição enviada com sucesso.',
              ApplicationStyles.toastSuccess);
          }
          return true;
        })
        .catch(() => {
          Toast.show('Não foi possível enviar a subscrição',
            ApplicationStyles.toastError);
        });
    }
  }

  render() {
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
          <View style={ApplicationStyles.container, styles.center}>
            <SubscriptionFields onRef={(ref) => (this.child = ref)} />
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row-reverse',
            marginRight: 50,
            paddingRight: 150,
            paddingLeft: 50,
            marginTop: 50,
            bottom: 20,
          }}
          >
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={{ justifyContent: 'center' }}>Próximo</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>);
  }
}

/* Export Component ==================================================================== */
export default SubscriptionView;