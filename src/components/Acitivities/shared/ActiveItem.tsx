import { Link } from '@unstyled-ui/atomic';
import { bgImg } from '@unstyled-ui/css';

import { IActiveItemType } from '../type';

export type ActivityItemProps = {
  activity: IActiveItemType;
};

export const ActivityItem: React.FC<ActivityItemProps> = props => {
  const { activity } = props;
  return (
    <div className="activityItem">
      {activity.link ? (
        <Link
          className="activity-item"
          key={activity.key}
          href={activity.link}
          target="_blank"
          rel="noreferrer"
          css={{ ...bgImg(activity.img, { backgroundSize: 'cover' }) }}
        >
          <div>{activity.text}</div>
        </Link>
      ) : (
        <div className="activity-item" key={activity.key} style={{ ...bgImg(activity.img, { backgroundSize: 'cover' }) }}>
          <div>{activity.text}</div>
        </div>
      )}
    </div>
  );
};
