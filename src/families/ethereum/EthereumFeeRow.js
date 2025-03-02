/* @flow */
import React, { Component, Fragment } from "react";
import { View, StyleSheet, Linking } from "react-native";
import { Trans, translate } from "react-i18next";
import type { Account } from "@ledgerhq/live-common/lib/types";
import type { Transaction } from "@ledgerhq/live-common/lib/bridge/EthereumJSBridge";
import { getAccountBridge } from "@ledgerhq/live-common/lib/bridge";
import SummaryRow from "../../screens/SendFunds/SummaryRow";
import LText from "../../components/LText";
import CurrencyUnitValue from "../../components/CurrencyUnitValue";
import CounterValue from "../../components/CounterValue";
import EthereumGasLimit from "./SendRowGasLimit";
import ExternalLink from "../../icons/ExternalLink";
import { urls } from "../../config/urls";

import colors from "../../colors";
import type { T } from "../../types/common";

type Props = {
  account: Account,
  transaction: Transaction,
  navigation: *,
  t: T,
};

class EthereumFeeRow extends Component<Props> {
  openFees = () => {
    const { account, navigation, transaction } = this.props;
    navigation.navigate("EthereumEditFee", {
      accountId: account.id,
      transaction,
    });
  };
  extraInfoFees = () => {
    Linking.openURL(urls.feesMoreInfo);
  };

  render() {
    const { account, transaction, t, navigation } = this.props;
    const bridge = getAccountBridge(account);
    const gasPrice = bridge.getTransactionExtra(
      account,
      transaction,
      "gasPrice",
    );
    const gasLimit = bridge.getTransactionExtra(
      account,
      transaction,
      "gasLimit",
    );
    const feeCustomUnit = bridge.getTransactionExtra(
      account,
      transaction,
      "feeCustomUnit",
    );
    return (
      <Fragment>
        <SummaryRow
          onPress={this.extraInfoFees}
          title={<Trans i18nKey="send.fees.title" />}
          additionalInfo={
            <View>
              <ExternalLink size={12} color={colors.grey} />
            </View>
          }
        >
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.accountContainer}>
              {gasPrice ? (
                <LText style={styles.valueText}>
                  <CurrencyUnitValue
                    unit={feeCustomUnit || account.unit}
                    value={gasPrice}
                  />
                </LText>
              ) : null}

              <LText style={styles.link} onPress={this.openFees}>
                {t("common.edit")}
              </LText>
            </View>
            <LText style={styles.countervalue}>
              <CounterValue
                before="≈ "
                value={gasPrice.times(gasLimit)}
                currency={account.currency}
              />
            </LText>
          </View>
        </SummaryRow>
        <EthereumGasLimit
          account={account}
          navigation={navigation}
          transaction={transaction}
        />
      </Fragment>
    );
  }
}

export default translate()(EthereumFeeRow);
const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    flexDirection: "row",
  },
  summaryRowText: {
    fontSize: 16,
    textAlign: "right",
    color: colors.darkBlue,
  },
  countervalue: {
    fontSize: 12,
    color: colors.grey,
  },
  valueText: {
    fontSize: 16,
  },
  link: {
    color: colors.live,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    textDecorationColor: colors.live,
    marginLeft: 8,
  },
});
