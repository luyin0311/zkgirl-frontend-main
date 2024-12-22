import './index.less';

import useWindowSize from '@src/hooks/useWindowSize';

import MobileActivities from './Mobile/Activities';
import PcActivities from './PcActivities';
import { IActiveItemType as _IActiveItemType } from './type';

interface IActivitiesPopup {
  data: IActiveItemType[];
}

export type IActiveItemType = _IActiveItemType;

export const ActivitiesPopup: React.FC<IActivitiesPopup> = props => {
  const { isMobile } = useWindowSize();
  return isMobile ? <MobileActivities list={props.data} /> : <PcActivities list={props.data} />;
};
