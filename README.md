# react-native-formik-fields

React Native Formik Fields for fast and easy implementation of forms with formik on React Native.

	  <Field
	      component={FormikTextInput}
	      name="surname"
	      label={"Insert surname"}
	      placeholder={"Insert Surname"}
	  />


It can render custom labels and error messages, both via function and via React Component

	  <Field
	      component={FormikTextInput}
	      name="surname"
	      label={"Surname"}
	      placeholder={"Insert surname"}
	      disabled={isSubmitting}
	      autoCorrect={false}
	      autoCompleteType={'off'}
	      isRequired={true}
	      renderLabel={ <Text>My Label</Text> }
	      renderError={ <Text>My Error</Text> }
	      textInputStyle={{ width: '100%' }}
	  />


	  <Field
	      component={FormikTextInput}
	      name="surname"
	      label={"Surname"}
	      placeholder={"Insert surname"}
	      disabled={isSubmitting}
	      autoCorrect={false}
	      autoCompleteType={'off'}
	      isRequired={true}
	      renderLabel={ (mLabel) => <Text>My Label: {mLabel}</Text> }
	      renderError={ (mError) => <Text>My Error: {mError}</Text> }
	      textInputStyle={{ width: '100%' }}
	  />