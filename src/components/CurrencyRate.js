// @flow

import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";
import { BigNumber } from "bignumber.js";
import type {
  CryptoCurrency,
  TokenCurrency,
} from "@ledgerhq/live-common/lib/types/currencies";
import colors from "../colors";
import LText from "./LText";
import CounterValue from "./CounterValue";
import CurrencyUnitValue from "./CurrencyUnitValue";

type Props = {
  currency: CryptoCurrency | TokenCurrency,
  fontStyle?: *,
  iconSize?: number,
};

class CurrencyRate extends PureComponent<Props> {
  static defaultProps = {
    iconSize: 10,
  };

  render() {
    const { currency, fontStyle, iconSize } = this.props;
    const one = new BigNumber(10 ** currency.units[0].magnitude);
    // $FlowFixMe
    const color = currency.color;

    return (
      <View style={styles.wrapper}>
        <Icon name="activity" color={color} size={iconSize} />
        <LText numberOfLines={1} tertiary style={[styles.text, fontStyle]}>
          <CurrencyUnitValue unit={currency.units[0]} value={one} />
          {" = "}
          <CounterValue currency={currency} value={one} />
        </LText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 4,
    color: colors.grey,
    fontSize: 12,
    lineHeight: 18,
  },
});

export default CurrencyRate;
