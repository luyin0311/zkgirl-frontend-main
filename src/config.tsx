import EpicBackGif from '@src/pages/Mint/img/Epic/Purple_back.gif';
import EpicBack from '@src/pages/Mint/img/Epic/Purple_back.mp4';
import EpicFrontGif from '@src/pages/Mint/img/Epic/Purple_front.gif';
import EpicFront from '@src/pages/Mint/img/Epic/Purple_front.mp4';
import EpicParticleGif from '@src/pages/Mint/img/Epic/Purple_particle.gif';
import EpicParticle from '@src/pages/Mint/img/Epic/Purple_particle.mp4';
import LegendaryBackGif from '@src/pages/Mint/img/Legendary/yellow_back.gif';
import LegendaryBack from '@src/pages/Mint/img/Legendary/yellow_back.mp4';
import LegendaryFrontGif from '@src/pages/Mint/img/Legendary/yellow_front.gif';
import LegendaryFront from '@src/pages/Mint/img/Legendary/yellow_front.mp4';
import LegendaryParticleGif from '@src/pages/Mint/img/Legendary/yellow_particle.gif';
import LegendaryParticle from '@src/pages/Mint/img/Legendary/yellow_particle.mp4';
import everland from '@src/pages/Mint/img/nftIcon/4everland.png';
import burgercities from '@src/pages/Mint/img/nftIcon/burgercities.png';
import Cupid from '@src/pages/Mint/img/nftIcon/Cupid.png';
import izumi from '@src/pages/Mint/img/nftIcon/izumi.png';
import lifeform from '@src/pages/Mint/img/nftIcon/lifeform.png';
import nftb from '@src/pages/Mint/img/nftIcon/nftb.png';
import secondlive from '@src/pages/Mint/img/nftIcon/secondlive.png';
import opBNBPool1Img from '@src/pages/Mint/img/op@2x.png';
import PartnerTicketImg from '@src/pages/Mint/img/opbnb_mainnet/PartnerTicket.png';
import RareBackGif from '@src/pages/Mint/img/Rare/Blue_back.gif';
import RareBack from '@src/pages/Mint/img/Rare/Blue_back.mp4';
import RareFrontGif from '@src/pages/Mint/img/Rare/Blue_front.gif';
import RareFront from '@src/pages/Mint/img/Rare/Blue_front.mp4';
import RareParticleGif from '@src/pages/Mint/img/Rare/Blue_particle.gif';
import RareParticle from '@src/pages/Mint/img/Rare/Blue_particle.mp4';
import SpecialBackGif from '@src/pages/Mint/img/Special/special_back.gif';
import SpecialBack from '@src/pages/Mint/img/Special/special_back.mp4';
import SpecialFrontGif from '@src/pages/Mint/img/Special/special_front.gif';
import SpecialFront from '@src/pages/Mint/img/Special/special_front.mp4';
import SpecialParticleGif from '@src/pages/Mint/img/Special/special_particle.gif';
import SpecialParticle from '@src/pages/Mint/img/Special/special_particle.mp4';
import Ticket10RareGif from '@src/pages/Mint/img/ticket10/blue.gif';
import Ticket10Rare from '@src/pages/Mint/img/ticket10/blue.mp4';
import Ticket10UncommonGif from '@src/pages/Mint/img/ticket10/green.gif';
import Ticket10Uncommon from '@src/pages/Mint/img/ticket10/green.mp4';
import Ticket10EpicGif from '@src/pages/Mint/img/ticket10/purple.gif';
import Ticket10Epic from '@src/pages/Mint/img/ticket10/purple.mp4';
import Ticket10SpecialBackGif from '@src/pages/Mint/img/ticket10/special.gif';
import Ticket10SpecialBack from '@src/pages/Mint/img/ticket10/special.mp4';
import Ticket10SpecialFrontGif from '@src/pages/Mint/img/ticket10/special_front.gif';
import Ticket10SpecialFront from '@src/pages/Mint/img/ticket10/special_front.mp4';
import Ticket10LegendaryGif from '@src/pages/Mint/img/ticket10/yellow.gif';
import Ticket10Legendary from '@src/pages/Mint/img/ticket10/yellow.mp4';
import Ticket10LegendaryFrontGif from '@src/pages/Mint/img/ticket10/yellow_front.gif';
import Ticket10LegendaryFront from '@src/pages/Mint/img/ticket10/yellow_front.mp4';
import UncommonBackGif from '@src/pages/Mint/img/Uncommon/Green_back.gif';
import UncommonBack from '@src/pages/Mint/img/Uncommon/Green_back.mp4';
import UncommonFrontGif from '@src/pages/Mint/img/Uncommon/Green_front.gif';
import UncommonFront from '@src/pages/Mint/img/Uncommon/Green_front.mp4';
import UncommonParticleGif from '@src/pages/Mint/img/Uncommon/Green_particle.gif';
import UncommonParticle from '@src/pages/Mint/img/Uncommon/Green_particle.mp4';
import { ReactNode } from 'react';

export const defaultNetwork = 'expchain';

export const Address = {
  opbnb_mainnet: {
    // FreeTicketAddress: isProd ? '0xbC106B9473f273492B039a375e9ABDF9698EC71D' : '0x2C820e1d31ed4c90f581e84475375801bb4B01a1',
    // TicketAddress: '',
    PartnerTicketAddress: import.meta.env.REACT_APP_PARTNER_TICKET_ADDRESS,
    PartnerTicketFactoryAddress: import.meta.env.REACT_APP_PARTNER_TICKET_FACTORY_ADDRESS,
    PartnerTicketRealTimeFactoryAddress: '',
  },
  expchain:{
    Address:import.meta.env.REACT_APP_CARDSYSTEM_ADDRESS,
  }
};
console.log('Address', Address);
export const PoolAddress = {
  opbnb_mainnet: [
    {
      name: 'zkGirl Pool',
      legendFactory: import.meta.env.REACT_APP_LEGEND_FACTORY_ADDRESS,
      img: opBNBPool1Img,
      pid: 2,
      color: '#fff',
      background: 'linear-gradient(90deg, #FFFBD7 0%, #FFE2C1 41.15%, #F6FFD4 75.67%, #FFF7B2 97.5%)',
      rules: (
        <>
          <p>Summoning 1 zkGirl costs 1 ticket each time.</p>
          <p>There are 4 rarities of zkGirls and you will receive one of them with each summoning randomly:</p>
          <p>- Legendary: 0.5%</p>
          <p>- Epic: 4.5%</p>
          <p>- Rare: 15%</p>
          <p>- Uncommon: 80%</p>
        </>
      ),
    },
  ],
  expchain: [
    {
      name: 'zkGirl Pool',
      legendFactory: import.meta.env.REACT_APP_LEGEND_FACTORY_ADDRESS,
      img: opBNBPool1Img,
      pid: 2,
      color: '#fff',
      background: 'linear-gradient(90deg, #FFFBD7 0%, #FFE2C1 41.15%, #F6FFD4 75.67%, #FFF7B2 97.5%)',
      rules: (
        <>
          <p>Summoning 1 zkGirl costs 1 ticket each time.</p>
          <p>There are 4 rarities of zkGirls and you will receive one of them with each summoning randomly:</p>
          <p>- Legendary: 0.5%</p>
          <p>- Epic: 4.5%</p>
          <p>- Rare: 15%</p>
          <p>- Uncommon: 80%</p>
        </>
      ),
    },
  ],
};

// export const pandaAddress = {
//     opbnb_mainnet: {
//         Legendary: '0xF250bf5953B601E42E93226F7A9e4e8B9E7435Af',
//         Epic: '0xaD106dEF88F4E8508503Fed3E7585Fc4990D6331',
//         Rare: '0xd750949f5eeeb2aa979a8c1e70b89d262666b878',
//         Uncommon: '0x409021a5e6c91d0cd5f9e547d29f327bba1b88fc'
//     },
// };

export const ticketImg = {
  opbnb_mainnet: {
    PartnerTicket: PartnerTicketImg,
  },
  expchain: {
    PartnerTicket: PartnerTicketImg,
  },
};

export const ticket: ITicket = {
  opbnb_mainnet: {
    PartnerTicket: {
      show: true,
      name: 'PartnerTicket',
      type: 'PartnerTicket',
      address: Address.opbnb_mainnet.PartnerTicketAddress,
      tokenId: 201,
      img: PartnerTicketImg,
      title: 'zkGirl Ticket for Staker',
      rules: (
        <div>
          <p>
            Users can claim one zkGirl Ticket per 500 ZKJ stakes at <span style={{ fontStyle: 'italic' }}>Claim Ticket</span> Page.
          </p>
          <p>Snapshots of ticket eligibility will be taken every 7 days, with a total of 3 snapshots during the event:</p>
          <p>- First Snapshot: June 20, 2024, 02:30 UTC</p>
          <p>- Second Snapshot: June 27, 2024, 00:00 UTC</p>
          <p>- Third Snapshot: July 4, 2024, 00:00 UTC</p>
          <p>Reminder: Tickets must be claimed before the earlier of the next snapshot or within 7 days, or they will expire.</p>
        </div>
      ),
    },
  },
  expchain: {
    PartnerTicket: {
      show: true,
      name: 'PartnerTicket',
      type: 'PartnerTicket',
      address: Address.expchain.Address,
      tokenId: 201,
      img: PartnerTicketImg,
      title: 'zkGirl Ticket for Staker',
      rules: (
        <div>
          <p>
            Users can claim one zkGirl Ticket per 500 ZKJ stakes at <span style={{ fontStyle: 'italic' }}>Claim Ticket</span> Page.
          </p>
          <p>Snapshots of ticket eligibility will be taken every 7 days, with a total of 3 snapshots during the event:</p>
          <p>- First Snapshot: June 20, 2024, 02:30 UTC</p>
          <p>- Second Snapshot: June 27, 2024, 00:00 UTC</p>
          <p>- Third Snapshot: July 4, 2024, 00:00 UTC</p>
          <p>Reminder: Tickets must be claimed before the earlier of the next snapshot or within 7 days, or they will expire.</p>
        </div>
      ),
    },
  },
};

export interface ITicket {
  [key: string]: {
    [key: string]: {
      show: boolean;
      name: string;
      type: string;
      address: string;
      tokenId: number;
      img: string;
      title: string;
      rules: ReactNode;
    };
  };
}

export type IOpBNBTicket = keyof (typeof ticket)['opbnb_mainnet'];

export const ticket10NftIcon: { [key: string]: string | undefined } = {
  Halo: everland,
  Phoenix: secondlive,
  Megan: lifeform,
  Merrow: izumi,
  Asura: secondlive,
  Mayonnaise: burgercities,
  Yukino: secondlive,
  Haruka: nftb,
  Ketchup: burgercities,
  Air: everland,
  Unicorn: secondlive,
  Nekomata: nftb,
  Cupid: Cupid,
};

export const LevelMP4 = {
  Uncommon: {
    back: UncommonBack,
    front: UncommonFront,
    particle: UncommonParticle,
    ticket10: Ticket10Uncommon,
  },
  Rare: {
    back: RareBack,
    front: RareFront,
    particle: RareParticle,
    ticket10: Ticket10Rare,
  },
  Epic: {
    back: EpicBack,
    front: EpicFront,
    particle: EpicParticle,
    ticket10: Ticket10Epic,
  },
  Legendary: {
    back: LegendaryBack,
    front: LegendaryFront,
    particle: LegendaryParticle,
    ticket10: Ticket10Legendary,
    ticket10Front: Ticket10LegendaryFront,
  },
  Special: {
    back: SpecialBack,
    front: SpecialFront,
    particle: SpecialParticle,
    ticket10: Ticket10SpecialBack,
    ticket10Front: Ticket10SpecialFront,
  },
};

export const LevelGIF = {
  Uncommon: {
    back: UncommonBackGif,
    front: UncommonFrontGif,
    particle: UncommonParticleGif,
    ticket10: Ticket10UncommonGif,
  },
  Rare: {
    back: RareBackGif,
    front: RareFrontGif,
    particle: RareParticleGif,
    ticket10: Ticket10RareGif,
  },
  Epic: {
    back: EpicBackGif,
    front: EpicFrontGif,
    particle: EpicParticleGif,
    ticket10: Ticket10EpicGif,
  },
  Legendary: {
    back: LegendaryBackGif,
    front: LegendaryFrontGif,
    particle: LegendaryParticleGif,
    ticket10: Ticket10LegendaryGif,
    ticket10Front: Ticket10LegendaryFrontGif,
  },
  Special: {
    back: SpecialBackGif,
    front: SpecialFrontGif,
    particle: SpecialParticleGif,
    ticket10: Ticket10SpecialBackGif,
    ticket10Front: Ticket10SpecialFrontGif,
  },
};
