import { StyleSheet } from 'react-native'

const buttonStyle = {
  height: '20%',
  justifyContent: 'center',
  alignItems: 'center',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  innerContainer: {
    flex: 1
  },
  inputWrapper: {
    flex: 0.2,
    backgroundColor: '#320d42',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  methodWrapper: {
    flex: 0.8,
    flexDirection: 'row'
  },
  numberPad: {
    flex: 0.75,
    backgroundColor: '#ffffff',
  },
  operatorWrapper: {
    flex: 0.25,
    backgroundColor: '#fc0352'
  },
  operatorButton: {
    ...buttonStyle,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#000000'
  },
  standaloneButton: {
    ...buttonStyle,
    width: '100%',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#fc0352',
  },
  numberRow: {
    flexDirection: 'row',
    height: '20%'
  },
  numberButton: {
    ...buttonStyle,
    width: `${100/3}%`,
    height: '100%',
    borderWidth: 1,
    borderColor: '#fc0352',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 32
  },
  input: {
    textAlign: 'right',
    height: '80%',
    fontSize: 50,
    color: '#ffffff'
  }
})

export default styles
