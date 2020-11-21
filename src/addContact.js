import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import data from '../data/data.json';
import Header from './header';
import Space from './space';
import Icon from 'react-native-vector-icons/Feather';

class AddContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oriData: [],
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      id: '',
    };
  }

  componentDidMount() {
    const params = this.props.route.params;
    const {firstName, lastName, email, phone} = params.item;

    this.setState({firstName, lastName, email, phone, oriData: params.oriData});
  }

  checkInput = value => {
    if (
      !value ||
      (typeof value === 'string' && !value.trim()) ||
      (Array.isArray(value) && value.length < 1)
    )
      Alert.alert('Oops', 'This is required field!', [{text: 'OK'}]);
  };

  saveInfo = () => {
    const {firstName, lastName, email, phone, oriData} = this.state;
    const params = this.props.route.params;
    let updatedList = [];

    if (firstName && lastName) {
      updatedList = oriData.map((item, index) => {
        if (item.id === params.item.id) {
          return {
            ...item,
            firstName,
            lastName,
            email,
            phone,
          };
        } else return item;
      });

      this.props.navigation.navigate(
        'contactList',
        params.callBack({list: updatedList}),
      );
    } else {
      Alert.alert('Error', 'Please fill in all the required field.', [
        {text: 'OK'},
      ]);
    }
  };

  render() {
    const {firstName, lastName, email, phone} = this.state;
    const params = this.props.route.params;
    const {navigation} = this.props;

    return (
      <View style={{flex: 1}}>
        <Header
          title=""
          textLeft="Cancel"
          textRight="Save"
          onPressRight={this.saveInfo}
          onPressLeft={navigation.goBack}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 20,
            }}>
            <View style={{alignItems: 'center'}}>
              <Icon name="circle" size={200} color="#ff8c00" />
            </View>
            <Space />
            <View style={{backgroundColor: '#D3D3D3'}}>
              <Text style={{fontWeight: 'bold', fontSize: 25}}>
                Main Information
              </Text>
            </View>
            <Space value={1} />
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 20}}>First Name</Text>
              <Space isVertical={false} />
              <TextInput
                style={styles.textInputStyle}
                onSubmitEditing={e => {
                  this.checkInput(e.nativeEvent.text);
                  this.nextInput.focus();
                }}
                onChangeText={e => this.setState({firstName: e})}
                placeholder="Required"
                placeholderTextColor="#D3D3D3"
                value={firstName}
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <Space value={1} />
            <View style={styles.divider} />
            <Space value={1} />
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 20}}>Last Name</Text>
              <Space isVertical={false} />
              <TextInput
                ref={input => {
                  this.nextInput = input;
                }}
                style={styles.textInputStyle}
                onSubmitEditing={e => {
                  this.checkInput(e.nativeEvent.text);
                  this.thirdInput.focus();
                }}
                onChangeText={e => this.setState({lastName: e})}
                placeholder="Required"
                placeholderTextColor="#D3D3D3"
                value={lastName}
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>

            <Space value={1} />
            <View style={{backgroundColor: '#D3D3D3'}}>
              <Text style={{fontWeight: 'bold', fontSize: 25}}>
                Sub Information
              </Text>
            </View>
            <Space value={1} />
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 20}}>Email</Text>
              <Space isVertical={false} />
              <TextInput
                ref={input => {
                  this.thirdInput = input;
                }}
                style={styles.textInputStyle}
                onChangeText={e => {
                  this.setState({email: e});
                }}
                onSubmitEditing={e => {
                  this.lastInput.focus();
                }}
                value={email}
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <Space value={1} />
            <View style={styles.divider} />
            <Space value={1} />
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 20}}>Phone</Text>
              <Space isVertical={false} />
              <TextInput
                ref={input => {
                  this.lastInput = input;
                }}
                style={styles.textInputStyle}
                onChangeText={e => this.setState({phone: e})}
                value={phone}
                returnKeyType="done"
              />
            </View>
          </ScrollView>
        </Header>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#A9A9A9',
    height: 1.5,
    width: '100%',
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    width: '65%',
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    justifyContent: 'space-between',
  },
});

export default AddContact;
