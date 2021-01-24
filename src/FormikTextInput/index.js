import React, {isValidElement, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {defaultColors, defaultIcons} from '../default';

export const DefaultTextInputStyles = StyleSheet.create({
  textInput: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    color: defaultColors.black,
    backgroundColor: defaultColors.backgroundColor,
    borderWidth: 0.5,
    borderColor: defaultColors.borderColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: defaultColors.borderColor,
    shadowRadius: 7,
    shadowOpacity: .1,
    lineHeight: 18,
    shadowOffset : { width: 0, height: 1 },
  },
  textInputOnFocus: {
    borderWidth: 1,
    borderColor: defaultColors.primary
  },
  textInputOnError: {
    borderWidth: 1,
    borderColor: defaultColors.error
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    color: defaultColors.text
  },
  required: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    color: defaultColors.primary
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: 22,
    marginTop: 4
  },
  errorLabel: {
    fontSize: 12,
    lineHeight: 16,
    paddingHorizontal: 4,
    color: defaultColors.error
  },
});

/**
 *
 * @param value
 * @param name
 * @param onBlur
 * @param onChange
 * @param errors
 * @param touched
 * @param status
 * @param setStatus
 * @param label
 * @param isRequired
 * @param editable
 * @param disabled
 * @param multiline
 * @param numberOfLines
 * @param heightRelativeToLines
 * @param selectionColor
 * @param placeholderTextColor
 * @param colors
 * @param fontFamily
 * @param labelStyle
 * @param textInputStyle
 * @param textInputStyleOnFocus
 * @param textInputStyleOnError
 * @param errorContainerStyle
 * @param renderLabel
 * @param renderError
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormikTextInput ({
  field: { value, name, onBlur, onChange },
  form: { errors, touched, status = {}, setStatus, isValid },
  label,
  isRequired = false,
  editable = true,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  heightRelativeToLines = false,
  selectionColor = defaultColors.primary,
  placeholderTextColor = defaultColors.textLight,
  colors = defaultColors,
  fontFamily,
  labelStyle,
  textInputStyle,
  textInputStyleOnFocus,
  textInputStyleOnError,
  containerStyle = {},
  errorContainerStyle,
  errorLabelStyle,
  errorIcon = <Image source={ defaultIcons.error} style={{ height: 14, width: 14 }}/>,
  renderLabel,
  renderError,
  ...rest
}) {

  const [ onFocus, setOnFocus ] = useState(false);

  const textInputStyles = StyleSheet.create({
    textInput: {
      ...DefaultTextInputStyles.textInput,
      fontFamily: fontFamily,
      backgroundColor: colors.backgroundColor,
      borderColor: colors.borderColor,
      shadowColor: colors.borderColor,
      minHeight: numberOfLines * DefaultTextInputStyles.textInput.lineHeight,
      textAlignVertical: multiline ? 'top': 'center',
      ...textInputStyle
    },
    textInputOnFocus: {
      ...DefaultTextInputStyles.textInputOnFocus,
      borderColor: colors.primary,
      ...textInputStyleOnFocus
    },
    textInputOnError: {
      ...DefaultTextInputStyles.textInputOnError,
      borderColor: colors.error,
      ...textInputStyleOnError
    },
    label: {
      ...DefaultTextInputStyles.label,
      fontFamily: fontFamily,
      color: colors.text,
      /* add a paddingLeft approx. near to the '*' width */
      paddingLeft: isRequired ? DefaultTextInputStyles.required.fontSize/2: 0,
      ...labelStyle
    },
    required: {
      ...DefaultTextInputStyles.required,
      fontFamily: fontFamily,
      color: colors.primary
    },
    errorContainer: {
      ...DefaultTextInputStyles.errorContainer,
      ...errorContainerStyle
    },
    errorLabel: {
      ...DefaultTextInputStyles.errorLabel,
      fontFamily: fontFamily,
      color: colors.error,
      ...errorLabelStyle
    }
  });

  const renderFieldLabel = () => {
    if(renderLabel !== undefined) {
      if(isValidElement(renderLabel)) { return renderLabel; }
      if(typeof renderLabel === "function") { return renderLabel(name); }
    }
    return <Text style={ textInputStyles.label }>{ label }&nbsp;{ isRequired? <Text style={ textInputStyles.required }>*</Text>: null }</Text>;
  }

  const renderFieldError = () => {
    if(errors[name] && touched[name])  {
      if(renderError !== undefined ) {
        if(isValidElement(renderLabel)) { return renderError; }
        if(typeof renderLabel === "function") { return renderError(errors[name]); }
      } else {
        return (
            <View style={ textInputStyles.errorContainer }>
              <Text style={ textInputStyles.errorLabel }>{ errors[name] }</Text>
              { errorIcon }
            </View>
        );
      }
    } else {
      return <View style={ textInputStyles.errorContainer } />;
    }

  }

  return (
      <View style={ containerStyle }>

        { renderFieldLabel() }

        <View style={{ flexDirection: 'row' }}>
          <TextInput
              onChangeText={onChange(name)}
              onBlur={() => { onBlur(name); setOnFocus(false); }}
              onFocus={() => { setOnFocus(true); setStatus({ ...status, failed: false }); }}
              editable={!disabled && editable}
              selectTextOnFocus={!disabled}
              value={value}
              multiline={multiline}
              numberOfLines={numberOfLines}
              style={[
                textInputStyles.textInput,
                ((errors[name] && touched[name]) || status.failed) && textInputStyles.textInputOnError,
                (isValid || onFocus) && textInputStyles.textInputOnFocus,
              ]}
              selectionColor={selectionColor}
              placeholderTextColor={placeholderTextColor}
              { ...rest }
          />
        </View>

        { renderFieldError() }

      </View>
  );

}
