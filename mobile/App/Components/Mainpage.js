import React, { Component, PropTypes } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'native-base';
import StepIndicator from '@components/StepIndicator';
import { Assets, ApplicationStyles, Colors, Fonts } from '@theme/';

export default class Homepage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Página inicial',
  });

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    const labels = [
      {name: "A POUPANÇA", description: "Saiba mais sobre a importância de poupar e os benefícios do PPR SGF Stoik Ações."},
      {name: "O INVESTIMENTO", description: "Conheça a carteira de activos e rendibilidades do PPR SGF Stoik Ações." },
      {name: "A PARTILHA", description: "Utilize o PPR SGF Stoik Ações como uma ferramenta de partilha com uma causa." },
      {name: "COMECE A INVESTIR", description: "Subscreva ou reforce a sua participação no PPR SGF Stoik Ações." }];
    const customStyles = {
      stepIndicatorSize: 75,
      currentStepIndicatorSize:75,
      separatorStrokeWidth: 5,
      currentStepStrokeWidth: 6,
      stepStrokeCurrentColor: Colors.stoikOrange,
      stepStrokeWidth: 3,
      stepStrokeFinishedColor: Colors.stoikOrange,
      stepStrokeUnFinishedColor: Colors.lightBlue,
      separatorFinishedColor: Colors.stoikOrange,
      separatorUnFinishedColor: Colors.lightBlue,
      stepIndicatorFinishedColor: Colors.stoikOrange,
      stepIndicatorUnFinishedColor: Colors.lightBlue,
      stepIndicatorCurrentColor: Colors.stoikOrange,
      stepIndicatorLabelFontSize: Fonts.base.size*1.75,
      currentStepIndicatorLabelFontSize: Fonts.base.size*1.75,
      stepIndicatorLabelCurrentColor: Colors.background,
      stepIndicatorLabelFinishedColor: Colors.lightBlue,
      stepIndicatorLabelUnFinishedColor: Colors.background,
      labelColor: Colors.lightBlue,
      labelSize: Fonts.base.size*1.5,
      descriptionColor: Colors.label,
      descriptionSize: Fonts.base.size,
      currentStepLabelColor: Colors.stoikOrange
    }

    return (
      <View style={ApplicationStyles.mainContainer}>
        <View style={[ApplicationStyles.container, ApplicationStyles.containerCentered]}>
          <StepIndicator
            customStyles={customStyles}
            labels={labels}
            stepCount={4}
            direction={'vertical'}
          />
        </View>
      </View>
    );
  }
}
