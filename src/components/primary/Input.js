import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { COLORS, SIZES } from '../../utils/theme';
import { StyleSheet } from 'react-native';
import Block from './Block';
import Text from './Text';

const Input = (props) => {
  /*
  //#region
   *
   * Props
   * mode
   * Type: 'flat' | 'outlined'
   * Default value: 'flat'
   * Mode of the TextInput.
   *
   * flat - flat input with an underline.
   * outlined - input with an outline.
   * In outlined mode, the background color of the label is derived from colors.background in theme or the backgroundColor style. This component render TextInputOutlined or TextInputFlat based on that props
   *
   * disabled
   * Type: boolean
   * Default value: false
   * If true, user won't be able to interact with the component.
   *
   * label
   * Type: string
   * The text to use for the floating label.
   *
   * placeholder
   * Type: string
   * Placeholder for the input.
   *
   * error
   * Type: boolean
   * Default value: false
   * Whether to style the TextInput with error style.
   *
   * onChangeText
   * Type: Function
   * Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.
   *
   * selectionColor
   * Type: string
   * Selection color of the input
   *
   * underlineColor
   * Type: string
   * Underline color of the input.
   *
   * dense
   * Type: boolean
   * Default value: false
   * Sets min height with densed layout. For TextInput in flat mode height is 64dp or in dense layout - 52dp with label or 40dp without label. For TextInput in outlined mode height is 56dp or in dense layout - 40dp regardless of label. When you apply heigh prop in style the dense prop affects only paddingVertical inside TextInput
   *
   * multiline
   * Type: boolean
   * Default value: false
   * Whether the input can have multiple lines.
   *
   * numberOfLines
   * Type: number
   * The number of lines to show in the input (Android only).
   *
   * onFocus
   * Type: (args: any) => void
   * Callback that is called when the text input is focused.
   *
   * onBlur
   * Type: (args: any) => void
   * Callback that is called when the text input is blurred.
   *
   * render
   * Type: (props: RenderProps) => React.ReactNode
   * Default value: (props: RenderProps) => <NativeTextInput {...props} />
   * Callback to render a custom input component such as react-native-text-input-mask instead of the default TextInput component from react-native.
   *
   * Example:
   *
   * <TextInput
   *   label="Phone number"
   *   render={props =>
   *     <TextInputMask
   *       {...props}
   *       mask="+[00] [000] [000] [000]"
   *     />
   *   }
   * />
   * value
   * Type: string
   * Value of the text input.
   *
   * style
   * Type: any
   * Pass fontSize prop to modify the font size inside TextInput.
   * Pass height prop to set TextInput height. When height is passed, dense prop will affect only input's paddingVertical. Pass paddingHorizontal to modify horizontal padding.
   * This can be used to get MD Guidelines v1 TextInput look.
   *
   * theme
   * Type: Theme
   * editable
   * Default value: true
   * ...TextInput props
   * Methods
   * These methods can be accessed on the ref of the component, e.g. textInputRef.isFocused(...args).
   *
   * isFocused
   * Returns true if the input is currently focused, false otherwise.
   *
   * clear
   * Removes all text from the TextInput.
   *
   * focus
   * Focuses the input.
   *
   * blur
   * Removes focus from the input.
   * //#endregion
   */
  /*
  ? autocomplete text feature inspired by
  ? https://gitlab.com/eduardoxlau92/textinput-material-autocomplete/-/blob/master/index.js
  */

  // const [text, setText] = useState(props.initialValue);
  // const [selected, setSelected] = useState(props.initialValue);
  // const [error, setError] = useState(true);

  // const onKeyPress = () => {
  //   if (text == selected && error) {
  //     setError(false);
  //   } else if (text != selected && !error) {
  //     props.error();
  //     setError(true);
  //   }
  // };

  // const toLowercase = text => {
  //   return text ? text.lowerCase() : null;
  // };

  // const listOptions = () => (
  //   <View
  //     style={{
  //       position: Platform.OS == "ios" ? "absolute" : "relative",
  //       zIndex: 99999999,
  //       width: "100%",
  //       top: 0
  //     }}
  //   >
  //     <ScrollView
  //       showsVerticalScrollIndicator={false}
  //       keyboardShouldPersistTaps="handler"
  //       style={styles.autocomplete}
  //     >
  //       {props.array
  //         .filter(object =>
  //           toLowerCase(object[props.field]).includes(
  //             toLowerCase(text)
  //           )
  //         )
  //         .map((data, key) => {
  //           return (
  //             <TouchableOpacity
  //               accessible={true}
  //               style={{ zIndex: 99999999 }}
  //               key={key}
  //               style={{}}
  //               onPress={() => {
  //                 setSelected(props.field)
  //                 setText(data[props.field])
  //                 setError(false)
  //                 props.value(data);
  //               }}
  //             >
  //               <Text style={styles.autocompleteText}>
  //                 {data[props.field]}
  //               </Text>
  //             </TouchableOpacity>
  //           );
  //         })}
  //     </ScrollView>
  //   </View>
  // );

  // if (props.autocomplete) {
  //   return (
  //     <View>
  //       <View>
  //         <TextInput
  //           label={props.label}
  //           mode="outlined"
  //           onKeyPress={onKeyPress()}
  //           value={text}
  //           error={error}
  //           onChangeText={text => {
  //            setText(text)
  //           }}
  //           {...props}
  //         />
  //       </View>
  //       <View>{error ? listOptions() : null}</View>
  //     </View>
  //   );
  // }

  return (
    <Block
      flex={(props.flex && props.flex) || 0}
      marginVertical={SIZES.base * 3}
      {...props.containerProps}
    >
      <TextInput
        theme={{
          roundess: 4,
          colors: {
            primary: COLORS.primary,
            surface: COLORS.background,
            background: COLORS.background,
            disabled: COLORS.inactive,
            underlineColor: 'transparent',
            placeholder: COLORS.muted,
            text: COLORS.gray,
          },
          fonts: {
            medium: 'Montserrat-Medium',
          },
        }}
        mode="outlined"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ fontSize: SIZES.h6 }}
        scrollEnabled={false}
        {...props}
      />
      {props.error && (
        <Text small color={COLORS.secondary} mtmedium>
          {props.error.message}
        </Text>
      )}
    </Block>
  );
};

export default Input;

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
// },
// autocomplete: {
//   // position:"relative",
//   backgroundColor: '#cecece',
//   zIndex: 999999999,
// },
// autocompleteText: {
//   zIndex: 999999999,
//   flex: 1,
//   padding: 10,
//   fontSize: 17,
//   fontWeight: 'bold',
// },
// });
