// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import MattermostLogo from 'components/widgets/icons/mattermost_logo';
import React from 'react';

type SvgProps = {
    width: number;
    height: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MattermostCloudSvg = ({width, height}: SvgProps) => (
    <MattermostLogo
        pngHeight={height}
        pngWidth={width}
    />
);

export default MattermostCloudSvg;
