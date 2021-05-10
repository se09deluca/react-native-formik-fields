import React, {isValidElement, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment/locale/it';
import {defaultColors, defaultIcons} from '../default';

moment.subtractThreeYear = function addRealMonth(d) {
  let fm = moment(d).subtract(3, 'Y');
  let fmEnd = moment(fm).endOf('month');
  return d.date() !== fm.date() && fm.isSame(fmEnd.format('YYYY-MM-DD')) ? fm.add(1, 'd') : fm;
};

moment.addNineMonth = function addRealMonth(d) {
  let fm = moment(d).add(9, 'M');
  let fmEnd = moment(fm).endOf('month');
  return d.date() !== fm.date() && fm.isSame(fmEnd.format('YYYY-MM-DD')) ? fm.add(1, 'd') : fm;
};

let pastThreeYear = moment.subtractThreeYear(moment()).toISOString();
let pastThreeYearValidation = moment.subtractThreeYear(moment()).subtract(1, 'days').toISOString();
let fromNowNineMonths = moment.addNineMonth(moment()).toISOString();
let fromNowNineMonthsValidation = moment.addNineMonth(moment()).add(1, 'days').toISOString();

export const MINIMUM_DATE = {
  //TIMESTAMP: '1893456000',
  //UNIX_TIME: '01 Jan 2016 00:00:00 GMT',
  //ISO_8601: '2016-01-01T00:00:00+00:00',
  ISO_8601: pastThreeYear,
  ISO_8601_VALIDATION: pastThreeYearValidation
};

export const MAXIMUM_DATE = {
  //TIMESTAMP: '1893456000',
  //UNIX_TIME: '01 Jan 2021 00:00:00 GMT',
  //ISO_8601: '2021-12-31T00:00:00+00:00',
  ISO_8601: fromNowNineMonths,
  ISO_8601_VALIDATION: fromNowNineMonthsValidation
};


export const DefaultDatePickerStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    minHeight: Platform.OS === "android" ? 82 : 90
  },
  label: {
    fontSize: 16,
    fontWeight: "800",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: defaultColors.text,
    paddingLeft: 20
  },
  datePickerTextInput: {
    flex: 1,
    height: 50,
    backgroundColor: defaultColors.white,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 15,
    color: defaultColors.text
  },
  datePickerInputContainer: {
    backgroundColor: defaultColors.backgroundColor,
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
    shadowRadius: 30,
    shadowOpacity: 1,
    shadowOffset : { width: 0, height: 1},
    borderRadius: 25
  },
  datePickerInputContainerOnFocus: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: defaultColors.highlight
  },
  datePickerInputContainerOnError: {
    borderWidth: 1,
    borderColor: defaultColors.error
  },
  datePickerAdviceWrapper: {
    borderRadius: 25,
    backgroundColor: defaultColors.white,
    overflow: 'hidden',
    shadowColor: "rgba(25,0,0,0.19)",
    shadowRadius: 30,
    shadowOpacity: 1,
    shadowOffset : { width: 0, height: 10},
  },
  inputRightIconTouchableContainer: {
    width: 40, height: 40,
    justifyContent: 'center',
  },
  inputRightIcon: {
    width: 21,
    height: 20,
    marginRight: 20
  },
  required: {
    fontSize: 16,
    fontWeight: "800",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: defaultColors.highlight
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: 22,
    marginTop: 4,
    marginBottom: 8
  },
  errorLabel: {
    fontSize: 12,
    lineHeight: 16,
    paddingHorizontal: 4,
    color: defaultColors.error
  },
  validationRuleContainer: {
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

    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 30,
    letterSpacing: 0,
    color: defaultColors.text
  }
});

const defaultCalendarIcon = <Image source={ require('./res/calendar.png') } style={DefaultDatePickerStyles.inputRightIcon}/>;

export function FormikDatePicker({
  field: { value, name, onBlur, onChange },
  form: { errors, touched, status = {}, setStatus, setFieldValue, isValid },
  label = '',
  placeholder = '',
  isRequired = false,
  disabled = false,
  minimumDate,
  maximumDate,
  icon = defaultCalendarIcon,
  colors = defaultColors,
  fontFamily,
  labelStyle,
  datePickerStyle,
  datePickerStyleOnFocus,
  datePickerStyleOnError,
  errorContainerStyle,
  errorLabelStyle,
  errorIcon = <Image source={ defaultIcons.error} style={{ height: 14, width: 14 }}/>,
  renderLabel,
  renderError,
  ...rest
}) {

  const [ selectedDate, setSelectedDate ] = useState('');
  const [ readableDate, setReadableDate ] = useState('');
  const [ isDateTimePickerVisible, setDateTimePickerVisibility ] = useState(false);

  const handleDatePickerConfirm = (date) => {

    setDateTimePickerVisibility( false );

    moment.locale('it');

    const ISODate = moment(date).toISOString(true);

    setSelectedDate( ISODate );

    setReadableDate( moment( date, moment.ISO_8601 ).format('LL') );

    setFieldValue( name, ISODate );

  };

  const handleDatePickerCancel = () => {
    setDateTimePickerVisibility( false );
  };

  useEffect(() => {

    if (value) {

      setReadableDate( moment(value, moment.ISO_8601).format('LL') );
      setSelectedDate( moment(value, moment.ISO_8601).toISOString() );
    }

  }, []);

  const datePickerStyles = StyleSheet.create({
    ...DefaultDatePickerStyles,
    label: {
      ...DefaultDatePickerStyles.label,
      fontFamily: fontFamily,
      color: colors.text,
      ...labelStyle
    },
    datePickerTextInput: {
      ...DefaultDatePickerStyles.datePickerTextInput,
      fontFamily: fontFamily
    },
    datePickerInputContainer: {
      backgroundColor: defaultColors.backgroundColor,
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
      shadowRadius: 30,
      shadowOpacity: 1,
      shadowOffset : { width: 0, height: 1},
      borderRadius: 25
    },
    datePickerInputContainerOnFocus: {
      ...DefaultDatePickerStyles.datePickerInputContainerOnFocus,
      ...datePickerStyleOnFocus
    },
    datePickerInputContainerOnError: {
      ...DefaultDatePickerStyles.datePickerInputContainerOnError,
      ...datePickerStyleOnError
    },
    datePickerAdviceWrapper: {
      borderRadius: 25,
      backgroundColor: defaultColors.white,
      overflow: 'hidden',
      shadowColor: "rgba(25,0,0,0.19)",
      shadowRadius: 30,
      shadowOpacity: 1,
      shadowOffset : { width: 0, height: 10},
    },
    inputRightIconTouchableContainer: {
      width: 40, height: 40,
      justifyContent: 'center',
    },
    inputRightIcon: {
      width: 21,
      height: 20,
      marginRight: 20
    },
    required: {
      fontSize: 16,
      fontWeight: "800",
      fontStyle: "normal",
      lineHeight: 20,
      letterSpacing: 0,
      color: defaultColors.highlight
    },
    errorContainer: {
      ...DefaultDatePickerStyles.errorContainer,
      ...errorContainerStyle
    },
    errorLabel: {
      ...DefaultDatePickerStyles.errorLabel,
      ...errorLabelStyle
    },
    validationRuleContainer: {
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

      fontSize: 12,
      fontWeight: "normal",
      fontStyle: "normal",
      lineHeight: 30,
      letterSpacing: 0,
      color: defaultColors.text
    }
  });

  const renderFieldLabel = () => {
    if(renderLabel !== undefined) {
      if(isValidElement(renderLabel)) { return renderLabel; }
      if(typeof renderLabel === "function") { return renderLabel(name); }
    }
    return <Text style={ datePickerStyles.label }>{ label }&nbsp;{ isRequired? <Text style={ datePickerStyles.required }>*</Text>: null }</Text>;
  }

  const renderFieldError = () => {
    if(errors[name] && touched[name])  {
      if(renderError !== undefined ) {
        if(isValidElement(renderLabel)) { return renderError; }
        if(typeof renderLabel === "function") { return renderError(errors[name]); }
      } else {
        return (
            <View style={ datePickerStyles.errorContainer }>
              <Text style={ datePickerStyles.errorLabel }>{ errors[name] }</Text>
              { errorIcon }
            </View>
        );
      }
    } else {
      return <View style={ datePickerStyles.errorContainer } />;
    }

  }

  return (
      <View style={datePickerStyles.container}>

        { renderFieldLabel() }

        <TouchableOpacity
            onPress={() => { setDateTimePickerVisibility(true); setStatus({ ...status, failed: false });  }}
            style={[
              datePickerStyles.datePickerInputContainer,
              (errors[name] && touched[name]) || status.failed ? datePickerStyles.datePickerInputContainerOnError : {},
              (isValid || isDateTimePickerVisible ) ? datePickerStyles.datePickerInputContainerOnFocus : {}
            ]}>

          <TextInput
              style={[ datePickerStyles.datePickerTextInput, { color: disabled ? 'gray' : 'black' } ]}
              value={readableDate}
              editable={false}
              onTouchStart={()=> { setDateTimePickerVisibility(true); setStatus({ ...status, failed: false });  } }
              onChangeText={onChange(name)}
              onBlur={onBlur(name)}
              placeholder={placeholder}
              underlineColorAndroid="transparent"
          />

          <View style={datePickerStyles.inputRightIconTouchableContainer}>

            { icon }

          </View>

        </TouchableOpacity>

        { renderFieldError() }

        <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={handleDatePickerConfirm}
            onCancel={handleDatePickerCancel}
            mode={'date'}
            datePickerModeAndroid={'calendar'}
            minimumDate={ minimumDate !== undefined ?  new Date(moment(minimumDate, moment.ISO_8601).toISOString()) : new Date(MINIMUM_DATE.ISO_8601) }
            maximumDate={ maximumDate !== undefined ?  new Date(moment(maximumDate, moment.ISO_8601).toISOString()) : new Date(MAXIMUM_DATE.ISO_8601) }
            date={ selectedDate === '' ? new Date(): new Date(selectedDate) }
            confirmTextIOS={'Conferma'}
            cancelTextIOS={'Indietro'}
            hideTitleContainerIOS={false}
            headerTextIOS={'Seleziona una data'}

        />
      </View>
  );
}


export default FormikDatePicker;
