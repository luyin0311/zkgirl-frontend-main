import { absXYCenter } from '@c3/css';
import { vw } from '@src/common/rw';
import Page from '@src/components/Layout/Page';
import PageContent from '@src/components/Layout/PageMain';
import { urlPath } from '@src/constants/urlPath';
import { Button, Space, Text } from '@unstyled-ui/atomic';
import { Col } from '@unstyled-ui/layout';
import React from 'react';
import { useNavigate } from 'react-router';

import Logo404 from './404';

const PageNotFound: React.FC = props => {
  const { ...restProps } = props;
  const nav = useNavigate();
  return (
    <Page>
      <PageContent css={{ mt: vw(45, 25) }}>
        <Col css={{ ...absXYCenter(), fx: 'center' }}>
          <Logo404 />
          <Space size={vw(32, 24)}></Space>

          <Text
            css={{
              typo: { fontSize: vw(32, 48), fontWeight: 500, lineHeight: 1.1 },
            }}
          >
            This page is lost
          </Text>
          <Space size={vw(24, 40)}></Space>
          <Text
            css={{
              w: vw(347, 700),
              typo: {
                fontSize: vw(16, 24),
                fontWeight: 400,
                lineHeight: 1.4,
                opacity: 0.7,
              },
              textAlign: 'center',
            }}
          >
            We’ve explored deep and wide,but we can’t find the page you were looking for.
          </Text>
          <Space size={vw(40, 60)}></Space>

          <Button
            onClick={() => nav(urlPath.home)}
            css={{
              w: vw(311, 366),
              h: vw(54),
              border: '1px solid white',
              borderRadius: 99999,
              typo: {
                fontSize: vw(18),
                fontWeight: 500,
              },
            }}
          >
            <Text gradient="linear-gradient(89.79deg, #0CFFF0 0.18%, #0CFFA7 99.9%)">Navigate back home</Text>
          </Button>
        </Col>
      </PageContent>
    </Page>
  );
};

export default PageNotFound;
