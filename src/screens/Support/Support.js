import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import Block from '../../components/primary/Block';
import Header from '../../components/Header';
import { SIZES } from '../../utils/theme';
class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isModalVisibleRes: false,
      isModalResMsg: '',
      resCode: '',
      unSyncedFarmers: [],
      refreshing: false,
      syncedData: 1,
      showSearchModal: false,
    };
  }
  static navigationOptions = () => {
    return {
      header: null,
    };
  };
  dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${08167164014}';
    } else {
      phoneNumber = 'telprompt:${08167164014}';
    }

    Linking.openURL(phoneNumber);
  };
  render() {
    return (
      <Block background>
        <Header backTitle="Support" />
        <ImageBackground
          source={require('../../assets/images/map.png')}
          style={{ width: '100%', height: '100%' }}
        >
          <Block
            paddingHorizontal={SIZES.padding}
            paddingVertical={60}
            style={{ paddingHorizontal: 20, paddingVertical: 60 }}
          >
            <View
              style={{
                backgroundColor: '#fff',
                paddingVertical: 20,
                borderRadius: 12,
                height: 350,
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <View>
                  <Image
                    source={require('../../assets/images/thriveLogo.png')}
                    style={{ height: 65, width: 65 }}
                  />
                </View>
                <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
                  <View>
                    <Text
                      style={{
                        color: '#33A847',
                        fontSize: 12,
                        fontWeight: '600',
                        textAlign: 'center',
                      }}
                    >
                      GET IN TOUCH WITH US
                    </Text>
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>
                      {' '}
                      31, 441 Crescent, Citec Villas, Gwarinpa, Abuja.
                    </Text>
                  </View>
                  {/* <View style={{marginTop:8}}>
                                            <TouchableOpacity onPress={() => Linking.openURL('mailto:info@thriveagric.com?subject=Hello ThriveAgric &body=Description') }
                                                 title="info@thriveagric.com" >
                                                <Text style={{textAlign:'center',fontSize:16}}>
                                                    info@thriveagric.com
                                                </Text>
                                            </TouchableOpacity>
                                        </View> */}
                  <View style={{ marginTop: 8 }}>
                    <TouchableOpacity onPress={this.dialCall}>
                      <Text style={{ textAlign: 'center', fontSize: 16 }}>
                        +234(0)816 716 4014
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 16,
                        color: '#33A847',
                      }}
                    >
                      FOLLOW US
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            'https://www.facebook.com/thriveagric'
                          )
                        }
                      >
                        <Image
                          source={require('../../assets/images/facebook.png')}
                          style={{ marginRight: 20, height: 30, width: 30 }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL('https://twitter.com/thriveagric')
                        }
                      >
                        <Image
                          source={require('../../assets/images/twitter.png')}
                          style={{ marginRight: 20, height: 30, width: 30 }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL('https://instagram.com/thriveagrichq')
                        }
                      >
                        <Image
                          source={require('../../assets/images/instagram.png')}
                          style={{ marginRight: 20, height: 30, width: 30 }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL('https://medium.com/thrive-agric')
                        }
                      >
                        <Image
                          source={require('../../assets/images/medium.png')}
                          style={{ height: 30, width: 30 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

export default Support;
const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#3BC552',
    flexDirection: 'row',
    paddingHorizontal: 20,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  Title: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  SyncData: {
    backgroundColor: '#000000',
    opacity: 0.8,
    width: 260,
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  unsynced: {
    backgroundColor: '#C7C7C7',
    opacity: 0.8,
    width: 260,
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  syncImg: {
    height: 24,
    width: 24,
  },
  SyncText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    marginLeft: 10,
  },
  UnsyncText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
    marginLeft: 10,
  },
  UserName: {
    fontSize: 16,
    color: '#000',
  },
  UserCreated: {
    color: '#808080',
    fontSize: 12,
  },
  OnboardButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  OnboardBackground: {
    backgroundColor: '#3BC552',
    width: 100,
    height: 22,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  OnboardText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },
  FloatButton: {
    position: 'absolute',
    bottom: 30,
    right: 27,
  },
  FloatBackground: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    width: 170,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  FloatButtonText: {
    color: '#0D9A49',
    textAlign: 'center',
    fontSize: 14,
    paddingLeft: 10,
  },
  formInputWrapper: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 15,
  },
  formInput: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    paddingVertical: 10,
    borderBottomColor: '#c7c7c7',
    borderBottomWidth: 0.25,
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  h2: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  boxContainer: {
    minWidth: '100%',
    maxWidth: '100%',
  },
});
