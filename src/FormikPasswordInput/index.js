import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import {defaultColors, defaultIcons} from '../default';

export const DefaultPasswordInputStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 2,
    minHeight: Platform.OS === "android" ? 82 : 90
  },
  passwordInputStyleLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    fontWeight: "800",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: defaultColors.text,
    paddingLeft: 20
  },
  passwordTextInput: {
    flex: 1,
    height: 50,
    backgroundColor: defaultColors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  passwordInputContainer: {
    backgroundColor: defaultColors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 10,
    alignSelf: 'stretch',
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#4c536468",
    overflow: 'hidden',
    shadowColor: "#332f4a55",
    shadowRadius: 7,
    shadowOpacity: .5,
    shadowOffset : { width: 0, height: 1},
    borderRadius: 25
  },
  passwordInputContainerOnError: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: defaultColors.error,
  },
  passwordInputContainerOnFocus: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: defaultColors.highlight,
  },
  passwordAdviceWrapper: {
    borderRadius: 25,
    backgroundColor: defaultColors.white,
  },
  passwordAdviceWrapperShadow: {
    shadowColor: "rgb(25,0,0)",
    shadowRadius: 10,
    shadowOpacity: .19,
    shadowOffset : { width: 0, height: 5 },
    elevation: 5
  },
  inputRightIconTouchableContainer: {
    width: 40, height: 40,
    justifyContent: 'center',
  },
  inputRightIcon: {
    width: 18,
    height: 10,
    marginRight: 20
  },
  required: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    fontWeight: "800",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: defaultColors.primary,
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
  validationRulesContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  validationRulesWrapper: {
    marginLeft:15,
    height: 30,
    flexDirection: 'row',
    alignContent: 'center'
  },
  validationImage: {
    height: 30,
    width: 30,
    marginRight: 3
  },
  validationText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 30,
    letterSpacing: 0,
    color: defaultColors.text,
  }
});

export default function FormikPasswordInput({
  field: {
    name,
    onBlur,
    onChange,
    value,
  },
  form: {
    errors,
    touched,
    status = {},
    setStatus,
    isValid
  },
  label,
  showAdvice = false,
  isRequired = false,
  disabled = false,
  autoCorrect = false,
  autoCompleteType = 'off',
  placeholder = '',
  selectionColor = defaultColors.primary,
  placeholderTextColor = defaultColors.textLight,
  colors = defaultColors,
  fontFamily,
  labelStyle,
  passwordInputStyle = {},
  passwordInputStyleOnFocus = {},
  passwordInputStyleOnError,
  containerStyle = {},
  errorContainerStyle,
  errorLabelStyle,
  errorIcon = <Image source={ defaultIcons.error} style={{ height: 14, width: 14 }}/>,
  renderLabel,
  renderError,
  ...rest
}) {

  const [ securePasswordEntry, setSecurePasswordEntry ] = useState(true );
  const [ areAdvicesVisible, setAdviceVisibility ] = useState(false);
  const [ iconName, setIconName ] = useState('eye');
  const [ onFocus, setOnFocus ] = useState(false);

  const [ leastOneLower, setLowerCase ] = useState(false);
  const [ leastOneUpper, setUpperCase ] = useState(false);
  const [ leastOneNumber, setOneNumber ] = useState(false);
  const [ leastEightChar, setEightChar ] = useState(false);

  let success = require('./res/done.png');
  let fail = require('./res/fail.png');


  const checkCustomValidity = (password) => {

    setLowerCase(/[a-z]/.test(password));
    setUpperCase(/[A-Z]/.test(password));
    setOneNumber(/\d/.test(password));
    setEightChar(password.length >= 8);

  };


  const renderFieldLabel = () => {
    if(renderLabel !== undefined) {
      if(isValidElement(renderLabel)) { return renderLabel; }
      if(typeof renderLabel === "function") { return renderLabel(name); }
    }
    return <Text style={ passwordInputStyles.label }>{ label }&nbsp;{ isRequired? <Text style={ passwordInputStyles.required }>*</Text>: null }</Text>;
  }


  const renderFieldError = () => {
    if(errors[name] && touched[name])  {
      if(renderError !== undefined ) {
        if(isValidElement(renderLabel)) { return renderError; }
        if(typeof renderLabel === "function") { return renderError(errors[name]); }
      } else {
        return (
            <View style={ passwordInputStyles.errorContainer }>
              <Text style={ passwordInputStyles.errorLabel }>{ errors[name] }</Text>
              { errorIcon }
            </View>
        );
      }
    } else {
      return <View style={ passwordInputStyles.errorContainer } />;
    }

  }


  const passwordInputStyles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      paddingHorizontal: 2,
      minHeight: Platform.OS === "android" ? 82 : 90
    },
    passwordTextInput: {
      flex: 1,
      height: 50,
      backgroundColor: defaultColors.white,
      paddingHorizontal: 8,
      paddingVertical: 15,
      fontFamily
    },
    passwordInputContainer: {
      ...DefaultPasswordInputStyles.passwordInputContainer
    },
    passwordInputContainerOnFocus: {
      ...DefaultPasswordInputStyles.passwordInputContainerOnFocus
    },
    passwordInputContainerOnError: {
      ...DefaultPasswordInputStyles.passwordInputContainerOnError,

    },
    passwordAdviceWrapper: {
      borderRadius: 25,
      backgroundColor: defaultColors.white,
    },
    passwordAdviceWrapperShadow: {
      shadowColor: "rgb(25,0,0)",
      shadowRadius: 10,
      shadowOpacity: .19,
      shadowOffset : { width: 0, height: 5 },
      elevation: 5
    },
    inputRightIconTouchableContainer: {
      width: 40, height: 40,
      justifyContent: 'center',
    },
    inputRightIcon: {
      width: 18,
      height: 10,
      marginRight: 20
    },
    validationRulesContainer: {
      marginTop: 15,
      marginBottom: 20,
    },
    validationRulesWrapper: {
      marginLeft:15,
      height: 30,
      flexDirection: 'row',
      alignContent: 'center'
    },
    validationImage: {
      height: 30,
      width: 30,
      marginRight: 3
    },
    validationText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 12,
      fontWeight: "normal",
      fontStyle: "normal",
      lineHeight: 30,
      letterSpacing: 0,
      color: defaultColors.text,
    },
    passwordInputOnFocus: {
      borderWidth: 1,
      borderColor: colors.highlight,
      ...passwordInputStyleOnFocus
    },
    passwordInputOnError: {
      ...DefaultPasswordInputStyles.passwordInputStyleOnError,
      borderWidth: 1,
      borderColor: colors.error,
      ...passwordInputStyleOnError
    },
    label: {
      ...DefaultPasswordInputStyles.passwordInputStyleLabel,
      fontFamily: fontFamily,
      color: colors.text,
      /* add a paddingLeft approx. near to the '*' width */
      paddingLeft: isRequired ? DefaultPasswordInputStyles.required.fontSize/2: 0,
      ...labelStyle
    },
    required: {
      ...DefaultPasswordInputStyles.required,
      fontFamily: fontFamily,
      color: colors.primary
    },
    errorContainer: {
      ...DefaultPasswordInputStyles.errorContainer,
      ...errorContainerStyle
    },
    errorLabel: {
      ...DefaultPasswordInputStyles.errorLabel,
      fontFamily: fontFamily,
      color: colors.error,
      ...errorLabelStyle
    }
  });

  const togglePasswordTextEntry = () => {
    setSecurePasswordEntry(!securePasswordEntry);
    setIconName(iconName === 'eye' ? 'eye-slash' : 'eye');
  }

  return (

      <View style={passwordInputStyles.container}>

        { renderFieldLabel() }

        { !showAdvice ?
            <View>
              <View style={[
                passwordInputStyles.passwordInputContainer,
                ( onFocus || isValid) && passwordInputStyles.passwordInputContainerOnFocus,
                ((errors[name] && touched[name]) || status.failed) && passwordInputStyles.passwordInputContainerOnError,
              ]}>
                <TextInput
                    style={passwordInputStyles.passwordTextInput}
                    underlineColorAndroid="transparent"
                    onChangeText={onChange(name)}
                    onBlur={() => { onBlur(name); setAdviceVisibility(false); setOnFocus(false);  }}
                    onFocus={() => { setAdviceVisibility(true); setOnFocus(true); setStatus({ ...status, failed: false }); }}
                    editable={!disabled}
                    value={value}
                    selectTextOnFocus={!disabled}
                    autoCorrect={autoCorrect}
                    autoCompleteType={ autoCompleteType }
                    textContentType={'none'}
                    placeholder={placeholder}
                    secureTextEntry={securePasswordEntry}
                    { ...rest }
                />

                <TouchableOpacity
                    style={passwordInputStyles.goBackTouchable}
                    onPress={ togglePasswordTextEntry } >
                  <Image source={ iconName === 'eye' ? require('./res/eye.png') : require('./res/eye-closed.png') }
                         style={passwordInputStyles.inputRightIcon}/>
                </TouchableOpacity>

              </View>
            </View>:
            <View style={[passwordInputStyles.passwordAdviceWrapper, areAdvicesVisible ? passwordInputStyles.passwordAdviceWrapperShadow: {}]}>

              <View style={[
                passwordInputStyles.passwordInputContainer,
                (onFocus || isValid) ? passwordInputStyles.passwordInputOnFocus : {},
                ((errors[name] && touched[name]) || status.failed) && passwordInputStyles.passwordInputOnError,
              ]}>
                <TextInput
                    style={passwordInputStyles.passwordTextInput}
                    underlineColorAndroid="transparent"
                    onChangeText={onChange(name)}
                    onChange={(e) => {checkCustomValidity(e.nativeEvent.text)}}
                    onBlur={() => { onBlur(name); setAdviceVisibility(false); setOnFocus(false); }}
                    onFocus={() => { setAdviceVisibility(true); setOnFocus(true); setStatus({ ...status, failed: false }); }}
                    editable={!disabled}
                    value={value}
                    selectTextOnFocus={!disabled}
                    textContentType={'none'}
                    placeholder={placeholder}
                    placeholdertextColor={defaultColors.text}
                    selectionColor={defaultColors.highlight}
                    secureTextEntry={securePasswordEntry}
                    { ...rest }
                />

                <TouchableOpacity
                    style={passwordInputStyles.inputRightIconTouchableContainer}
                    onPress={ togglePasswordTextEntry }>
                  <Image source={ iconName === 'eye' ? require('./res/eye.png') : require('./res/eye-closed.png') }
                         style={passwordInputStyles.inputRightIcon}/>
                </TouchableOpacity>
              </View>

              { areAdvicesVisible ?
                  <View  style={ passwordInputStyles.validationRulesContainer }>
                    <View style={ passwordInputStyles.validationRulesWrapper }>
                      <Image source={ leastOneUpper ? success : fail }
                             style={ passwordInputStyles.validationImage }/>
                      <Text style={ passwordInputStyles.validationText }>
                        Almeno 1 lettera maiuscola
                      </Text>
                    </View>
                    <View style={ passwordInputStyles.validationRulesWrapper }>
                      <Image source={ leastOneLower ? success : fail }
                             style={ passwordInputStyles.validationImage }/>
                      <Text style={ passwordInputStyles.validationText }>
                        Almeno 1 lettera minuscola
                      </Text>
                    </View>
                    <View style={ passwordInputStyles.validationRulesWrapper }>
                      <Image source={ leastOneNumber ? success : fail }
                             style={ passwordInputStyles.validationImage }/>
                      <Text style={ passwordInputStyles.validationText }>
                        Almeno 1 numero
                      </Text>
                    </View>
                    <View style={ passwordInputStyles.validationRulesWrapper }>
                      <Image source={ leastEightChar ? success : fail }
                             style={ passwordInputStyles.validationImage }/>
                      <Text style={ passwordInputStyles.validationText }>
                        Almeno 8 caratteri
                      </Text>
                    </View>
                  </View> : null }

              {/*errors[name] && touched[name] && <Text style={passwordInputStyles.errorLabel}>{errors[name]}</Text>*/}

            </View>
        }

        { renderFieldError() }

      </View>
  );
}
