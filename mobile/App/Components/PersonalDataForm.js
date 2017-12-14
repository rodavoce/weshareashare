import React, { Component } from 'react';
import { Item, Input, Text } from 'native-base';
import { ApplicationStyles, Colors } from '@theme/';
import {StyleSheet} from 'react-native';
import I18n from '@i18n/i18n';
var t = require('tcomb-form-native');

var Form = t.form.Form;

var Gender = t.enums({
    'M': 'Male',
    'F': 'Female'
}, "Gender");

var Person = t.struct({
    NAME: t.maybe(t.String),
    GENDER: t.maybe(Gender),
    BIRTHDAY: t.maybe(t.Date),
    TELEPHONE: t.maybe(t.String),
    CELLPHONE: t.maybe(t.String),
    ADDRESS: t.maybe(t.String),
    POSTAL: t.maybe(t.String),
    AREA: t.maybe(t.String),
    ID: t.maybe(t.Number),
    NIF: t.maybe(t.Number),
    JOB: t.maybe(t.String),
    EMPLOYER: t.maybe(t.String)
});

var options = {
    auto:'placeholders',
    stylesheet: stylesheet,
    fields:{
        NAME:{
            placeholder: "Nome",
        },
        GENDER: {
            label: "Género",
            nullOption: false,
            mode: "dropdown",
        },
        BIRTHDAY: {
            label: "Data de Nascimento",
            config: {
                format: (date) => date.toDateString(),
            },
            mode: "date",
        },
        TELEPHONE: {
            placeholder: "Nº de telefone",
        },
        CELLPHONE: {
            placeholder: "Nº de telemóvel",
        },
        ADDRESS: {
            placeholder: "Morada",
        },
        POSTAL: {
            placeholder: "Código Postal",
        },
        AREA: {
            placeholder: "Localidade",
        },
        ID: {
            placeholder: "BI/CC nº",
        },
        NIF: {
            placeholder: "NIF",
        },
        JOB: {
            placeholder: "Profissão",
        },
        EMPLOYER: {
            placeholder: "Entidade Patronal",
        }
    }
}

var initialValues = {
    // gender: 'M',
    BIRTHDAY: new Date("1980-01-01")
}

class PersonalDataForm extends Component {
  constructor(props) {
    super(props);
  };

  //assigning function to be used by parent
  componentDidMount(){
      this.props.onRef(this);
  }

  componentWillUnmount(){
      this.props.onRef(undefined);
  }

  retrieveValues(){
      var values = this.refs.form.getValue();
      return values;
  }

  render() {
    return (
      <Form
          ref="form"
          type={Person}
          options={options}
          value={initialValues}
      />
    );
  };
};

export default PersonalDataForm;

var styles = StyleSheet.create({
    center: {
        borderColor: Colors.lightBlue,
    }

});


var stylesheet = t.form.Form.stylesheet;

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1
stylesheet.textboxView.normal.borderBottomColor = Colors.lightBlue;
stylesheet.textboxView.error.borderBottomColor = Colors.lightBlue;
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.error.marginBottom = 5;
stylesheet.textbox.normal.borderColor = Colors.lightBlue;
stylesheet.textbox.error.borderColor = Colors.lightBlue;
stylesheet.textbox.normal.borderBottomColor = Colors.lightBlue;
stylesheet.textbox.error.borderBottomColor = Colors.lightBlue;

stylesheet.datepicker.normal.flexDirection = "row";
stylesheet.datepicker.normal.flex = 1;
