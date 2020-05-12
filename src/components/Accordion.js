import React from "react";
import { AccordionList } from "accordion-collapse-react-native";
import Block from './primary/Block'
import Text from './primary/Text'

import { faq } from '../data'


const Accordion = () => {

    
     const Head = (item) => { 
        return (
         <Block >
            <Text>{item.title}</Text>
         </Block>
        );
        }
     
     const Body = (item) => { 
       
       return (
         <Block >
            <Text>{item.body}</Text>
         </Block>
         );
        }
    
    return (
        <AccordionList>
            list={faq}
            header={Head}
            body={Body}
        </AccordionList>

    );
}

export default Accordion;
