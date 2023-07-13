// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {CSSProperties} from 'react';
import {useIntl} from 'react-intl';

export default function MattermostLogo({pngHeight='36px', pngWidth='36px'}) {
    const {formatMessage} = useIntl();
    return (
        // <span {...props}>
        //     <svg
        <span>
            <img
                src='/static/images/favicon/Chicmic_logo1200.png'
                height={pngHeight}
                width={pngWidth}
                alt='erp logo'
            />
               
        </span>
    );
}


