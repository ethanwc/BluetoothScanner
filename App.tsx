import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import {BleManager} from 'react-native-ble-plx';

declare var global: {HermesInternal: null | {}};
const manager: BleManager = new BleManager();

let scannedDevices = new Set();

const App = () => {

  const [devices, setDevices] = useState(new Set());

  const handleDevice = (newDevice: any) => {
    scannedDevices.add(newDevice.id);
    if (newDevice.name) {
      console.log(newDevice.id, newDevice.name)
    }
  };

  const scan = () => {
    manager.startDeviceScan(null, null, (error, scannedDevice) =>
      handleDevice(scannedDevice),
    );
  };

  const stop = () => {
    manager.stopDeviceScan();
    let updatedDevices = new Set([...devices, ...scannedDevices]);
    setDevices(updatedDevices);
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <Button title="Scan" onPress={() => scan()} />
      <Text style={{alignSelf: 'center'}}>{devices.size}</Text>
      <Button title="Stop" onPress={() => stop()} />
    </View>
  );
};

export default App;
