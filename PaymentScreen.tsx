import * as React from "react";
import {
  Button,
} from "react-native";
import { goSellSDK, goSellSDKModels } from '@tap-payments/gosell-sdk-react-native';
import sdkConfigurations from './sdkConfigurations';

export interface PaymentOverlayProp { }
export const PaymentOverlay: React.FunctionComponent<PaymentOverlayProp> = ({ }) => {

  const startSDK = () => {
    console.log('start SDK');
    console.log(goSellSDK);
    goSellSDK && goSellSDK.startPayment(sdkConfigurations, handleResult)
  }

  const handleResult = (error: any, status: any) => {
    var myString = JSON.stringify(status);
    console.log('status is ' + status.sdk_result);
    console.log(myString);
    var resultStr = String(status.sdk_result);
    switch (resultStr) {
      case 'SUCCESS':
        handleSDKResult(status)
        break
      case 'FAILED':
        handleSDKResult(status)
        break
      case "SDK_ERROR":
        console.log('sdk error............');
        console.log(status['sdk_error_code']);
        console.log(status['sdk_error_message']);
        console.log(status['sdk_error_description']);
        console.log('sdk error............');
        break
      case "NOT_IMPLEMENTED":
        break
    }
  }

  const handleSDKResult = (result: any) => {
    console.log('trx_mode::::');
    console.log(result['trx_mode'])
    switch (result['trx_mode']) {
      case "CHARGE":
        console.log('Charge');
        console.log(result);
        printSDKResult(result);
        break;

      case "AUTHORIZE":
        printSDKResult(result);
        break;

      case "SAVE_CARD":
        printSDKResult(result);
        break;

      case "TOKENIZE":
        Object.keys(result).map((key) => {
          console.log(`TOKENIZE \t${key}:\t\t\t${result[key]}`);
        })

        // responseID = tapSDKResult['token'];
        break;
    }
  }

  const printSDKResult = (result: any) => {
    if (!result) return
    Object.keys(result).map((key) => {
      console.log(`${result['trx_mode']}\t${key}:\t\t\t${result[key]}`);
    })
  }

  return (
    <>
      <Button
        title={"دفع"}
        onPress={startSDK}
      />
    </>
  );
};