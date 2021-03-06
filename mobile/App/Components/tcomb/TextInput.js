/**
 * Text Input template for tcomb
 *
 */
import React from 'react';
import { View, Platform } from 'react-native';

// Components
import { FormInput, FormLabel, FormValidationMessage } from '@ui/';
import { Colors } from '@theme/';

/* Component ==================================================================== */
function textbox(locals) {
  if (locals.hidden) {
    return null;
  }

  return (
    <View>
      {!!locals.label && <FormLabel>{locals.label}</FormLabel>}
      <FormInput
        accessibilityLabel={locals.label}
        autoCapitalize={locals.autoCapitalize}
        autoCorrect={locals.autoCorrect}
        autoFocus={locals.autoFocus}
        blurOnSubmit={locals.blurOnSubmit}
        editable={locals.editable}
        keyboardType={locals.keyboardType}
        maxLength={locals.maxLength}
        multiline={locals.multiline}
        onBlur={locals.onBlur}
        onEndEditing={locals.onEndEditing}
        onFocus={locals.onFocus}
        onLayout={locals.onLayout}
        onSelectionChange={locals.onSelectionChange}
        onSubmitEditing={locals.onSubmitEditing}
        onContentSizeChange={locals.onContentSizeChange}
        placeholderTextColor={locals.placeholderTextColor}
        secureTextEntry={locals.secureTextEntry}
        selectTextOnFocus={locals.selectTextOnFocus}
        selectionColor={locals.selectionColor}
        numberOfLines={locals.numberOfLines}
        underlineColorAndroid={locals.underlineColorAndroid}
        clearButtonMode={locals.clearButtonMode}
        clearTextOnFocus={locals.clearTextOnFocus}
        enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
        keyboardAppearance={locals.keyboardAppearance}
        onKeyPress={locals.onKeyPress}
        returnKeyType={locals.returnKeyType}
        selectionState={locals.selectionState}
        onChangeText={value => locals.onChange(value)}
        onChange={locals.onChangeNative}
        placeholder={locals.placeholder}
        value={locals.value}
        containerStyle={locals.multiline ? {
          borderWidth: 1,
          borderColor: Colors.lightBlue,
          ...Platform.select({
            ios: {
              shadowColor: 'rgba(0,0,0, .2)',
              shadowOffset: {height: 0, width: 0},
              shadowOpacity: 1,
              shadowRadius: 1,
            },
            android: {
              elevation: 1,
            },
          }),
        } : {}}
      />
      {!!locals.error && <FormValidationMessage>{locals.error}</FormValidationMessage>}
    </View>
  );
}

/* Export Component ==================================================================== */
module.exports = textbox;
