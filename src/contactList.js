import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  TextInput,
} from 'react-native';
import data from '../data/data.json';
import Header from './header';
import Space from './space';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';

class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oriData: [],
      fetching: false,
    };
  }

  componentDidMount() {
    this.setState({oriData: data});
  }

  initialLoad = () => {
    const {fetching} = this.state;

    this.setState({oriData: data});
  };

  result = data => {
    const {list} = data;
    this.setState({oriData: list});
  };

  render() {
    const {navigation} = this.props;
    const {oriData, fetching} = this.state;

    return (
      <View style={{flex: 1}}>
        <Header
          title="Contacts"
          iconLeft="search"
          iconRight="plus"
          iconColor="#ff8c00"
          iconSize={30}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 20,
              paddingTop: 10,
            }}
            refreshControl={
              <RefreshControl
                onRefresh={this.initialLoad}
                refreshing={fetching}
              />
            }>
            {oriData &&
              oriData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate('addContact', {
                      callBack: this.result,
                      item,
                      oriData,
                    });
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="circle" color="#ff8c00" size={40} />
                    <Space isVertical={false} />
                    <Text>
                      {item.firstName} {item.lastName}
                    </Text>
                  </View>
                  <Space />
                  <View style={styles.divider} />
                  <Space />
                </TouchableOpacity>
              ))}
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
    width: '95%',
    justifyContent: 'center',
  },
});

const ConPage = ContactList;

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  return (
    <ConPage
      {...props}
      navigation={navigation}
      route={route}
      isFocused={isFocused}
    />
  );
}
