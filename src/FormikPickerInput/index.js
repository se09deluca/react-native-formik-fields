import React, {isValidElement, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {defaultColors} from '../default';

const { width } = Dimensions.get('window');

const chevronDownIcon = require('./res/chevron-down.png');

export const DefaultPickerInputStyles = StyleSheet.create({
    pickerInput: {
        height: 50,
        width: 300,
        borderRadius: 10,
        color: defaultColors.black,
        backgroundColor: defaultColors.backgroundColor,
        borderWidth: 1,
        borderColor: defaultColors.borderColor,
        paddingHorizontal: 20,
        shadowColor: defaultColors.borderColor,
        shadowRadius: 7,
        shadowOpacity: .1,
        lineHeight: 18,
        shadowOffset : { width: 0, height: 1 },
    },
    pickerInputOnFocus: {
        borderWidth: 1,
        borderColor: defaultColors.primary
    },
    pickerInputOnError: {
        borderWidth: 1,
        borderColor: defaultColors.error
    },
    label: {
        fontSize: 16,
        fontWeight: "800",
        lineHeight: 22,
        color: defaultColors.text
    },
    required: {
        fontSize: 16,
        fontWeight: "800",
        fontStyle: "normal",
        lineHeight: 20,
        letterSpacing: 0,
        color: defaultColors.primary
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minHeight: 22,
        paddingHorizontal: 4
    },
    errorLabel: {
        fontSize: 12,
        lineHeight: 16,
        paddingHorizontal: 4,
        textAlign: "right",
        color: defaultColors.error
    }
});

export default function FormikPickerInput({
    field: { value, name, onBlur, onChange },
    form: { errors, touched, status = {}, setStatus, setFieldValue, isValid },
    label,
    placeholder = "Seleziona un opzione",
    isRequired = false,
    disabled = false,
    confirmText = "Conferma",
    options = [],
    colors = defaultColors,
    fontFamily,
    labelStyle,
    errorLabelStyle,
    pickerInputStyle,
    pickerInputStyleOnFocus,
    pickerInputStyleOnError,
    errorContainerStyle,
    renderLabel,
    renderError,
    ...rest
}) {

    const [ onFocus, setOnFocus ] = useState(false);


    const pickerInputStyles = StyleSheet.create({
        pickerContainer: {
            ...DefaultPickerInputStyles.pickerInput,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: fontFamily,
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
            shadowColor: colors.borderColor,
            ...pickerInputStyle
        },
        pickerInputOnFocus: {
            ...DefaultPickerInputStyles.pickerInputOnFocus,
            borderColor: colors.primary,
            ...pickerInputStyleOnFocus
        },
        pickerInputOnError: {
            ...DefaultPickerInputStyles.pickerInputOnError,
            borderColor: colors.error,
            ...pickerInputStyleOnError
        },
        label: {
            ...DefaultPickerInputStyles.label,
            fontFamily: fontFamily,
            color: colors.text,
            /* add a paddingLeft approx. near to the '*' width */
            paddingLeft: isRequired ? DefaultPickerInputStyles.required.fontSize/2: 0,
            ...labelStyle
        },
        required: {
            ...DefaultPickerInputStyles.required,
            fontFamily: fontFamily,
            color: colors.primary
        },
        errorContainer: {
            ...DefaultPickerInputStyles.errorContainer,
            ...errorContainerStyle
        },
        errorLabel: {
            ...DefaultPickerInputStyles.errorLabel,
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
        return <Text style={ pickerInputStyles.label }>{ label }&nbsp;{ isRequired? <Text style={ pickerInputStyles.required }>*</Text>: null }</Text>;
    }

    const renderFieldError = () => {
        if(errors[name] && touched[name])  {
            if(renderError !== undefined ) {
                if(isValidElement(renderLabel)) { return renderError; }
                if(typeof renderLabel === "function") { return renderError(errors[name]); }
            } else {
                return (
                    <View style={ pickerInputStyles.errorContainer }>
                        <Text style={ pickerInputStyles.errorLabel }>{ errors[name] }</Text>
                    </View>
                );
            }
        } else {
            return <View style={ pickerInputStyles.errorContainer } />;
        }

    }

    const placeholderObj = {
        label: placeholder,
        value: null,
        color: defaultColors.textLight
    };


    return (
        <View>

            { renderFieldLabel() }

            <View style={[
                pickerInputStyles.pickerContainer,
                onFocus && pickerInputStyles.pickerInputOnFocus,
                ( isValid || onFocus ) && pickerInputStyles.pickerInputOnFocus,
                ((errors[name] && touched[name]) || status.failed) && pickerInputStyles.pickerInputOnError,
            ]}>
                <Image source={ chevronDownIcon } style={{ position: 'absolute', right: 20, height: 14, width: 14 }}/>
                <RNPickerSelect
                    value={ value }
                    onValueChange={ (itemValue) => {
                        setFieldValue(name, itemValue);
                        setOnFocus(false);
                    } }
                    placeholder={ placeholderObj }
                    onClose={() => { onBlur(name); setOnFocus(false); }}
                    onDonePress={() => { onBlur(name); setOnFocus(false); }}
                    onOpen={() => { setOnFocus(true); setStatus({ ...status, failed: false }); }}
                    items={options}
                    disabled={disabled}
                    doneText={ confirmText }
                    useNativeAndroidPickerStyle={false}
                    style={{
                        viewContainer: {
                            height: 50,
                            flex: 1
                        },
                        inputIOS: {
                            fontFamily: fontFamily,
                            height: '100%',
                            color: defaultColors.text,
                        },
                        placeholder: {
                            fontFamily: fontFamily,
                            color: defaultColors.textLight
                        },
                        inputAndroidContainer: {
                            width: width * .85,
                        },
                        inputAndroid: {
                            fontFamily: fontFamily,
                            color: defaultColors.text,
                            height: '100%'
                        }
                    }}
                    { ...rest }
                />
            </View>

            { renderFieldError() }

        </View>
    );
}

