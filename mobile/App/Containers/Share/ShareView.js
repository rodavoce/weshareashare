import React, { Component } from 'react';
import { ScrollView, TouchableHighlight, Text } from 'react-native';
import I18n from '@i18n/i18n';
import { ApplicationStyles, Colors, Assets, Metrics } from '@theme/';
import { Card, Text as CustomText, Spacer } from '@ui/';

export default class Share extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('projectWeshareashare'),
  });

  render () {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={ApplicationStyles.container}>
        <Card>
          <CustomText h3 style={{color: Colors.textSecondary}}>
            O WeShareAShare é um projeto sem fins lucrativos que nasceu do desejo de juntar dois mundos tipicamente desligados: Finanças e Causas.
          </CustomText>
          <Spacer size={10}/>
          <CustomText h2 style={{color: Colors.textSecondary}}>
            O nosso objetivo é continuar a providenciar os retornos sólidos da família de estratégias Stoik, proporcionando ao mesmo tempo, uma oportunidade para que possa apoiar uma determinada causa em que acredita.
          </CustomText>
          <Spacer size={10}/>
          <CustomText h3 style={{color: Colors.textSecondary}}>
            A Stoik partilha parte das suas comissões líquidas, geradas pelos investidores participantes, e as nossas comissões não são mais elevadas em virtude do projeto WeShareAShare.
          </CustomText>
          <CustomText h3 style={{color: Colors.textSecondary}}>
            Poderá apoiar causas com impacto positivo, em qualquer área à sua escolha, quer seja ambiental, social ou cultural.
          </CustomText>
        </Card>
      </ScrollView>
    );
  }
};


