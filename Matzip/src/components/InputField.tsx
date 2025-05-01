import React, {useRef} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInputProps,
  View,
} from 'react-native';
import {colors} from '../constants';
import {TextInput} from 'react-native-gesture-handler';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

function InputField({
  disabled = false,
  error,
  touched,
  ...props
}: InputFieldProps) {
  const innerRef = useRef<TextInput | null>(null);

  const handlePressInput = () => {
    innerRef.current?.focus();
  };

  return (
    <Pressable onPress={handlePressInput}>
      <View
        style={[
          styles.container,
          disabled && styles.disabled,
          touched && Boolean(error) && styles.inputError,
        ]}>
        <TextInput
          ref={innerRef}
          editable={!disabled}
          placeholderTextColor={colors.GRAY_500}
          style={[styles.input, disabled && styles.disabled]}
          autoCapitalize="none" // 자동 대문자 방지
          spellCheck={false} // 맞춤법 검사 비활성화
          autoCorrect={false} // 자동 수정 비활성화
          {...props}
        />
        {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: deviceHeight > 700 ? 15 : 10,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default InputField;
