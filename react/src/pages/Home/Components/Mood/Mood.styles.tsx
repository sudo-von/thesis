import { StyleSheet } from 'react-native';

const moodStyles = StyleSheet.create({
  emojiView: {
    marginTop: 35,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    height: 50,
    width: 50,
    tintColor: '#ffda59',
    backgroundColor: '#f9f9e6',
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  small: {
    textAlign: 'center',
  },
  sliderInputView: {
    marginVertical: 20,
  },
} as const);

export default moodStyles;
