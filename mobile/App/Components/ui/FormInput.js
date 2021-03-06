/**
 * Text Input
 *
     <FormInput></FormInput>
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormInput } from 'react-native-elements';

// Consts and Libs
import { Colors, Fonts } from '@theme/';

/* Component ==================================================================== */
class CustomFormInput extends Component {
  static propTypes = {
    containerStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({}),
    ]),
    inputStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({}),
    ]),
  }

  static defaultProps = {
    containerStyle: [],
    inputStyle: [],
  }

  inputProps = () => {
    // Defaults
    const props = {
      ...this.props,
      containerStyle: [{
        borderBottomColor: Colors.lightBlue,
        borderBottomWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginTop: 5,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 5,
      }],
      inputStyle: [{
        color: Colors.textPrimary,
        fontFamily: Fonts.base.family,
        fontSize: Fonts.base.size * 1.25,
        paddingHorizontal: 0,
        paddingVertical: 0,
      }],
    };

    if (this.props.containerStyle) {
      props.containerStyle.push(this.props.containerStyle);
    }

    if (this.props.inputStyle) {
      props.inputStyle.push(this.props.inputStyle);
    }

    return props;
  }

  render = () => <FormInput {...this.inputProps()} />
}

/* Export Component ==================================================================== */
export default CustomFormInput;
