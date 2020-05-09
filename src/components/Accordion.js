/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
// import React from "react";
// import { AccordionList } from "accordion-collapse-react-native";
// import Block from './primary/Block'
// import Text from './primary/Text'

// import { faq } from '../data'

// const Accordion = () => {

//      const Head = (item) => {
//         return (
//          <Block >
//             <Text>{item.title}</Text>
//          </Block>
//         );
//         }

//      const Body = (item) => {

//        return (
//          <Block >
//             <Text>{item.body}</Text>
//          </Block>
//          );
//         }

//     return (
//         <AccordionList>
//             list={faq}
//             header={Head}
//             body={Body}
//         </AccordionList>

//     );
// }

// export default Accordion;

import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ImageIcon from './primary/ImageIcon';

export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };
  }

  render() {
    return (
      <View style={{ paddingTop: 20 }}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => this.toggleExpand()}
        >
          <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
          {this.state.expanded ? (
            <ImageIcon name="add" />
          ) : (
            <ImageIcon name="add" />
          )}
          {/* <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={Colors.DARKGRAY} /> */}
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.state.expanded && (
          <View style={styles.child}>
            <Text style={{ color: '#808080', fontSize: 14 }}>
              {this.props.data}
            </Text>
          </View>
        )}
      </View>
    );
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
    paddingVertical: 0,
    //color: Colors.DARKGRAY,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    // paddingLeft:25,
    // paddingRight:20,
    alignItems: 'center',
  },
  // eslint-disable-next-line react-native/no-color-literals
  parentHr: {
    height: 1,
    paddingVertical: 10,
    width: '100%',
    color: '#808080',
  },
  child: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
