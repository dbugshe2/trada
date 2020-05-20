import React from 'react';
import Block from '../../components/primary/Block';
import Accordion from '../../components/Accordion';
import Header from '../../components/Header';
import { SIZES } from '../../utils/theme';

const Faq = () => {
  const [data, setData] = React.useState([
    {
      title: 'What is Tradr?',
      body:
        'Tradr is the official utility aimed at digitizing the Agricultural market place for all things input.It is tailored to ease access of inputs to farmers and give the farmers easy access to offtakers.',
    },
    {
      title: 'How do I use Tradr?',
      body:
        'Visit the Android Playstore. Search for the Tradr. Open the app and fill the required details to sign up as an agent. On signing up,you can onboard farmers and view the farmer activities.Also ,you can fund your wallets and start transactions.',
    },
    {
      title: 'What transactions can be carried out on Tradr?',
      body: ' You can Purchase and also Sell inputs listed in the app.',
    },
    {
      title: ' How do i Make payment?',
      body:
        ' You can make payments by funding your wallet via bank transfer or USSD. Go to the wallet tab on the app and click the fund option.A unique bank account number is generated for you to pay into.',
    },
    {
      title: 'How do i get paid when my goods are bought?',
      body:
        'Go to the wallet tab on the app and click the withdraw option. You then input what amount you wish to draw out and what bank account you wish to have it transferred to.',
    },
    {
      title: 'How does the commissions work?',
      body:
        'After you register an account on Tradr, you onboard farmers and get a certain percentage on whatever transaction they make on the app.',
    },
  ]);
  return (
    <Block background>
      <Header backTitle="FAQs" />
      <Block
        scroll
        contentContainerStyle={{ paddingHorizontal: SIZES.padding }}
      >
        {data.map((item, index) => (
          <Accordion key={`faq-item-${index}`} data={item} />
        ))}
      </Block>
    </Block>
  );
};

export default Faq;
