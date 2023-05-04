import React from 'react'
import { TextInput } from 'react-native'
import { styles } from '../../styles'

export default function Input({setItem, handler, value}):JSX.Element {
  return (
    <TextInput
        style={styles.input}
        onChangeText={setItem}
        value={value}
        placeholder="Login"
        placeholderTextColor="grey"
        onSubmitEditing={handler}
      />
  )
}
