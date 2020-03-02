import React from 'react';
import {View, Button} from 'react-native';
import {BleManager, Device} from 'react-native-ble-plx';

declare var global: {HermesInternal: null | {}};
const manager: BleManager = new BleManager();

const App = () => {
  const printDevice = (device: any) => {
    if (device.name) {
      console.log(device.name);
    }
  };

  const scan = () => {
    manager.startDeviceScan(null, null, (error, scannedDevice) =>
      printDevice(scannedDevice),
    );
  };

  const stop = () => {
    manager.stopDeviceScan();
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <Button title="Scan" onPress={() => scan()} />
      <Button title="Stop" onPress={() => stop()} />
    </View>
  );
};

export default App;
