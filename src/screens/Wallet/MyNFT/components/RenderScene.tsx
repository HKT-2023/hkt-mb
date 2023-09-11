import GeneralTab from './GeneralTab';
import OfferTab from './Buyer/OfferTab';
import React from 'react';
import routes from '@app/constants/routes';
import SaleHistoryTab from './Seller/SaleHistoryTab';
import {IRPListOffer, IRPViewNFTDetail, TSaleType} from '@app/definitions/TApi';
import {TRouteNFT} from '@app/definitions/INFTs';
import {ViewCondition} from '@app/components/organism';
import BidTab from './Buyer/BidTab';
import {TButtonAny} from '@app/definitions/TButton';

const renderScene = (
  selectedOffer: IRPListOffer | null,
  setSelectedOffer: TButtonAny<IRPListOffer | null>,
  routeKey: TRouteNFT,
  index: number,
  salesType?: TSaleType,
  item?: IRPViewNFTDetail,
): JSX.Element => {
  const _isVisible = routes.getStatus(routeKey, index, salesType);
  switch (routeKey) {
    case 'GENERAL':
      return (
        <ViewCondition isVisible={index === 0}>
          <GeneralTab nft={item} />
        </ViewCondition>
      );
    case 'OFFER':
      return (
        <ViewCondition isVisible={_isVisible}>
          <OfferTab
            nft={item}
            setSelectedOffer={setSelectedOffer}
            selectedOffer={selectedOffer}
          />
        </ViewCondition>
      );
    case 'BID':
      return (
        <ViewCondition isVisible={_isVisible}>
          <BidTab nft={item} />
        </ViewCondition>
      );
    case 'SALE_HISTORY':
      return (
        <ViewCondition isVisible={_isVisible}>
          <SaleHistoryTab nft={item} />
        </ViewCondition>
      );
    default:
      return <React.Fragment />;
  }
};

export default {renderScene};
