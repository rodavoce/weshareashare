import React, { Component } from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { ApplicationStyles, Colors, Assets, Metrics } from '@theme/';
import { Card, Text as CustomText, Spacer } from '@ui/';
import AppStep from '@components/AppStep';
import BulletText from '@components/BulletText'

export default class Investment extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'O Investimento',
  });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={ApplicationStyles.container}>
        <Card>
          <CustomText h1 style={[ApplicationStyles.paddingBottom]}>PPR SGF Stoik Ações</CustomText>

          <BulletText text={'O PPR SGF Stoik Ações é constítuido por uma carteira de activos balanceada e diversificada, que integra obrigações, acções, matérias primas, imobiliário e liquidez.'}/>
          <BulletText text={'O PPR SGF Stoik Ações destina-se, assim, a investidores com horizonte temporais de poupança alargados e tolerância ao risco de mercado.'}/>

          <Image
            source={Assets.piechart}
            style={{ height: Metrics.DEVICE_HEIGHT / 2.5,
              alignSelf: 'center' }}
            resizeMode="contain"
          />

          <TouchableOpacity style={ApplicationStyles.rightAligned} onPress={() => navigate('Performances')}>
            <CustomText p style={ApplicationStyles.nextLink}>
             Evolução do Valor da Up >
            </CustomText>
          </TouchableOpacity>
        </Card>
        <AppStep index={1} {...this.props} />
      </ScrollView>
    );
  }
}

