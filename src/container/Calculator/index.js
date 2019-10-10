import React, { Fragment, Component } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './styles'

const color = {
  WHITE: '#ffffff'
}

const OPERATOR = {
  ADDITION: 'Addition',
  SUBTRACTION: 'Substraction',
  MULTIPLICATION: 'Multiplication',
  DIVISION: 'Division',
  EQUAL: 'Equal'
}

export default class Calculator extends Component {
  constructor() {
    super()
    this.state = {
      value: "0",
      calculationValue: "0",
      operator: null
    }
  }

  onChangeValue = (inputValue) => {
    const { operator, value, calculationValue } = this.state
    console.log(operator, value, calculationValue, inputValue);


    // if (Number(value) === Number(calculationValue)) {
    //   this.setState({ value: inputValue[inputValue.length -1] })
    // } else {
    //   this.setState({ value: inputValue || "0" })
    // }
    // if (operator) {
    //   this.setState({ value: inputValue, calculationValue: value })
    // }
  }

  onClearPress = () => this.setState({ value: "0", calculationValue: "0", operator: null })

  onButtonPress = (number) => {
    const { value, operator } = this.state

    if (operator) {
      this.setState({ value: number.toString(), calculationValue: value })
    } else {
      this.setState({ value: Number(`${value}${number}`).toString()})
    }

    // if (!Number(value) || Number(value) === Number(calculationValue)) {
    //   this.setState({ value: number.toString() })
    // } else {
    //   this.setState({ value: `${value}${number}`})
    // }
  }

  calculateAddition = (a, b) => (Number(a) + Number(b)).toString()

  calculateSubstraction = (a, b) => (Number(b) - Number(a)).toString()

  calculateMultiplication = (a, b) => (Number(a) * Number(b)).toString()

  calculateDivision = (a, b) => (Number(b) / Number(a)).toString()

  handleOperation = (newOperator) => {
    const { operator, value, calculationValue } = this.state

    if (newOperator === OPERATOR.EQUAL) {
      this.setState({
        operator: null,
        value: (operator && !!Number(calculationValue) && !!Number(value))
          ? this[`calculate${operator}`](value, calculationValue)
          : value,
        calculationValue: "0"
      })
      return
    }

    this.setState({ operator: newOperator }, () => this.calculateResult(operator, newOperator))
  }

  calculateResult = (operator, newOperator) => {
    const { value, calculationValue } = this.state
    const result = this[`calculate${operator || newOperator}`](value, calculationValue)

    if (!Number(calculationValue)) {
      return
    }

    if (Number(value) && Number(calculationValue)) {
      this.setState({
        value: result,
        calculationValue: "0"
      })
    }
  }

  renderInput = () => {
    const { value } = this.state

    return (
      <View style={styles.inputWrapper}>
        <TextInput
          autoFocus
          caretHidden
          keyboardType="number-pad"
          style={styles.input}
          onChangeText={text => this.onChangeValue(text)}
          value={value}
          defaultValue={"0"}
          maxLength={11}
        />
      </View>
    )
  }

  renderOperator = () => {
    return (
      <View style={styles.operatorWrapper}>
        <TouchableOpacity style={styles.operatorButton} onPress={() => this.handleOperation(OPERATOR.ADDITION)}>
          <FontAwesome
            name="plus"
            color={color.WHITE}
            size={30}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.operatorButton} onPress={() => this.handleOperation(OPERATOR.SUBTRACTION)}>
          <FontAwesome
            name="minus"
            color={color.WHITE}
            size={30}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.operatorButton} onPress={() => this.handleOperation(OPERATOR.MULTIPLICATION)}>
          <FontAwesome
            name="close"
            color={color.WHITE}
            size={30}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.operatorButton} onPress={() => this.handleOperation(OPERATOR.DIVISION)}>
          <FontAwesome5
            name="divide"
            color={color.WHITE}
            size={30}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.operatorButton} onPress={() => this.handleOperation(OPERATOR.EQUAL)}>
          <FontAwesome5
            name="equals"
            color={color.WHITE}
            size={30}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderNumberPad = () => {
    return (
      <View style={styles.numberPad}>
        <TouchableOpacity style={styles.standaloneButton} onPress={this.onClearPress}>
          <Text style={styles.textStyle}>CLEAR</Text>
        </TouchableOpacity>
        <View style={styles.numberRow}>
          {
            [7, 8, 9].map((item) => (
              <TouchableOpacity
                key={`number-${item}`}
                style={styles.numberButton}
                onPress={() => this.onButtonPress(item)}
              >
                <Text style={styles.textStyle}>{item}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <View style={styles.numberRow}>
          {
            [4, 5, 6].map((item) => (
              <TouchableOpacity
                key={`number-${item}`}
                style={styles.numberButton}
                onPress={() => this.onButtonPress(item)}
              >
                <Text style={styles.textStyle}>{item}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <View style={styles.numberRow}>
          {
            [1, 2, 3].map((item) => (
              <TouchableOpacity
                key={`number-${item}`}
                style={styles.numberButton}
                onPress={() => this.onButtonPress(item)}
              >
                <Text style={styles.textStyle}>{item}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <TouchableOpacity style={styles.standaloneButton} onPress={() => this.onButtonPress(0)}>
          <Text style={styles.textStyle}>0</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderMethod = () => {
    return (
      <View style={styles.methodWrapper}>
        {this.renderNumberPad()}
        {this.renderOperator()}
      </View>
    )
  }

  render() {
    console.log(this.state.value, this.state.calculationValue, this.state.operator);
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView behavior="padding" style={styles.innerContainer}>
            {this.renderInput()}
            {this.renderMethod()}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Fragment>
    )
  }
}
