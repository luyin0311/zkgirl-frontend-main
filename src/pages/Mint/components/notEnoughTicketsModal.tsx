import { ticketImg } from '@src/config';
import { urlPath } from '@src/constants/urlPath';
import { useNavigate } from 'react-router';

import { useBalanceStore } from '../store/store';
import { useTabModal } from './useTabModal';

export default (freeMintStatus: string | undefined, mintType: string | undefined) => {
  const { state } = useBalanceStore(s => s);
  const nav = useNavigate();
  return useTabModal({
    className: 'modalNotEnoughTickets',
    showClose: true,
    content: (
      <>
        <div className="title">Not enough tickets</div>
        <img src={ticketImg[state.network].PartnerTicket} alt="" />
        {/* <img src={freeMintStatus === 'Ticket' && !state[state.network].Ticket || mintType === 'Ticket10' ? ticketImg[state.network].Ticket : ticketImg[state.network].FreeTicket} alt="" /> */}
        <div className="btn active " onClick={() => nav(urlPath.ticket)}>
          <div>
            <span>Claim Tickets</span>
          </div>
        </div>
      </>
    ),
  });
};
