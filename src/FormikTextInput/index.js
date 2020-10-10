import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {defaultColors} from '../default';

const { height } = Dimensions.get('window');

export const DefaultTextInputStyles = StyleSheet.create({
  textInputContainer: {
    alignSelf: 'stretch',
    minHeight: Platform.OS === "android" ? 82 : 90
  },
  textInputContainerOnFocus: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: defaultColors.primary
  },
  textInput: {
    height: 50,
    width: 300,
    borderRadius: 10,
    backgroundColor: defaultColors.backgroundColor,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: defaultColors.borderColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    overflow: 'hidden',
    shadowColor: defaultColors.borderColor,
    shadowRadius: 7,
    shadowOpacity: .7,
    lineHeight: 18,
    shadowOffset : { width: 0, height: 1 },
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 26,
    letterSpacing: 0,
    color: defaultColors.text,
    paddingLeft: 20,
  },
  errorLabel: {
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "right",
    color: defaultColors.error
  },
  required: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: defaultColors.primary
  },
  errorContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 16,
    marginTop: 5
  }
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
 * @param containerStyle
 * @param containerStyleOnFocus
 * @param labelStyle
 * @param textInputStyle
 * @param errorContainerStyle
 * @param renderError
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormikTextInput ({
  field: { value, name, onBlur, onChange },
  form: { errors, touched, status = {}, setStatus },
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
  containerStyle,
  containerStyleOnFocus,
  labelStyle,
  textInputStyle,
  errorContainerStyle,
  renderError,
  ...rest
}) {

  const [ onFocus, setOnFocus ] = useState(false);

  const textInputStyles = StyleSheet.create({
    textInputContainer: {
      ...DefaultTextInputStyles.textInputContainer,
      ...containerStyle
    },
    textInputContainerOnFocus: {
      ...DefaultTextInputStyles.textInputContainerOnFocus,
      borderColor: colors.primary,
      ...containerStyleOnFocus
    },
    textInput: {
      ...DefaultTextInputStyles.textInput,
      fontFamily: fontFamily,
      backgroundColor: colors.backgroundColor,
      borderColor: colors.borderColor,
      shadowColor: colors.borderColor,
      ...textInputStyle
    },
    label: {
      ...DefaultTextInputStyles.label,
      fontFamily: fontFamily,
      color: colors.text,
      ...labelStyle
    },
    errorContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: 16,
      marginTop: 5,
      ...errorContainerStyle
    },
    errorLabel: {
      ...DefaultTextInputStyles.errorLabel,
      fontFamily: fontFamily,
      color: colors.error
    },
    required: {
      ...DefaultTextInputStyles.required,
      fontFamily: fontFamily,
      color: colors.primary
    }
  });

  const renderFieldError = () => {
    if(errors[name] && touched[name])  {
      if(renderError !== undefined && typeof renderError === "function" ) {
        renderError(errors[name])
      } else {
        return (
            <View style={ textInputStyles.errorContainer }>
              <Text style={textInputStyles.errorLabel}>{ errors[name] }</Text>
              <View style={{ paddingLeft: 5, marginRight: 15 }}>
                <Image source={require('./res/error.png')} style={{ height: 14, width: 14 }}/>
              </View>
            </View>
        )
      }
    } else {
      return <View style={ textInputStyles.errorContainer } />;
    }

  }

  return (
      <View style={[
        textInputStyles.textInputContainer,
        multiline && !heightRelativeToLines ?
            { minHeight: height * .25,
              height: (((textInputStyles.textInput.height / 2) * numberOfLines) + textInputStyles.label.lineHeight + textInputStyles.errorLabel.lineHeight ) }: {},
        heightRelativeToLines ? { height: (( textInputStyles.textInput.lineHeight * numberOfLines) + textInputStyles.textInput.paddingVertical + textInputStyles.textInput.lineHeight + textInputStyles.errorLabel.lineHeight ) }: {}
      ]}>
        <Text style={ textInputStyles.label }>{ label }&nbsp;{ isRequired? <Text style={ textInputStyles.required }>*</Text>: null }</Text>
        <TextInput
            onChangeText={onChange(name)}
            onBlur={() => { onBlur(name); setOnFocus(false); }}
            onFocus={() => { setOnFocus(true); setStatus({ ...status, failed: false }); }}
            editable={!disabled && editable}
            selectTextOnFocus={!disabled}
            value={value}
            multiline={multiline}
            numberIfLines={numberOfLines}
            style={[
              textInputStyles.textInput,
              ((errors[name] && touched[name]) || status.failed) && { borderWidth: 1, borderColor: colors.error, color: disabled ? colors.gray : colors.darkGray },
              onFocus && textInputStyles.textInputContainerOnFocus,
              multiline && ({
                minHeight: numberOfLines * textInputStyles.textInput.lineHeight,
                justifyContent: "flex-start", textAlignVertical: 'top'
              })
            ]}
            selectionColor={selectionColor}
            placeholderTextColor={placeholderTextColor}
            { ...rest }
        />

        { renderFieldError() }

      </View>
  );

}
