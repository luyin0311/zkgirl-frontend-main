import http from '../base';

export interface IPoint {
  totalPoints: number;
  sharePoints: number;
  miscellaneousPoints: number;
}
export interface ICommunityPoint extends IPoint {
  community: { id: string };
}
export interface ICommunityPointInfo {
  totalPoints: number;
  invitationPoints: number;
  communityPoints: ICommunityPoint[];
}
export const getPoints = async (): Promise<ICommunityPointInfo> => {
  return http.get('/user/pointInfos');
};

// export const getPointsOf = async (cid: string): Promise<ICommunityPoint> => {
//   const res = await getPoints();
//   const communityPoint =
//     (res?.communityPoints || []).find(e => e.community.id === cid) ||
//     ({} as ICommunityPoint);
//   return communityPoint;
// };
