import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { WARNA_UTAMA, WARNA_DISABLE } from '../../utils/constant'
import { IconHome, IconHomeAktif, IconDashboard, IconDashboardAktif, IconAccount, IconAccountAktif } from '../../assets'

const TabItem = ({isFocused, onPress, onLongPress, label }) => {
  const Icon = () => {
      if(label === "Home") return isFocused ? <IconHomeAktif/> : <IconHome />

      if(label === "Dashboard") return isFocused ? <IconDashboardAktif /> : <IconDashboard/>

      if(label === "Account") return isFocused ? <IconAccountAktif/> : <IconAccount />

      return <IconHome />
  }
  return (
<TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
       
    },
    text: (isFocused) => ({
        fontSize: 12,
        color: isFocused ? WARNA_UTAMA : WARNA_DISABLE,
        marginTop: 2
    })
});
