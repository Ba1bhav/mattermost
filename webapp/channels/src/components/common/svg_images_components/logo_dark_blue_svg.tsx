// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import MattermostLogo from 'components/widgets/icons/mattermost_logo';
import React from 'react';

type Props = {
    width?: number;
    height?: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (props: Props) => (
    <MattermostLogo
        pngHeight={props.height}
        pngWidth={props.width}
    />
);
