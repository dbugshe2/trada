import React from 'react';
import Block from '../../components/primary/Block';
import Header from '../../components/Header';
import Text from '../../components/primary/Text';
import { SIZES, COLORS } from '../../utils/theme';
import Accordian from '../../components/Accordion';

const Faq = () => {
  const [menu, setMenu] = React.useState([
    {
      title: 'What is the problem with plants not growing well?',
      data:
        'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
    },
    {
      title: 'What is the problem with plants?',
      data:
        'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.',
    },
    {
      title: 'What is the problem with plants not growing well?',
      data:
        'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.',
    },
    {
      title: 'What is the problem with plants not growing well?',
      data:
        'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire',
    },
    {
      title: 'What is the problem with plants not growing well?',
      data:
        'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire',
    },
    {
      title: 'What is the problem with plants not growing well?',
      data:
        'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire',
    },
    {
      title: 'What is the problem with plants not growing well?',
      data:
        'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire',
    },
    {
      title: 'What is the problem with plants not growing well?',
      data:
        'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire',
    },
  ]);
  return (
    <Block background>
      <Header backTitle="FAQ" />
      <Block scroll>
        {menu.map((item, index) => (
          <Block key={index}>
            <Accordian title={item.title} data={item.data} />
          </Block>
        ))}
      </Block>
    </Block>
  );
};

export default Faq;
