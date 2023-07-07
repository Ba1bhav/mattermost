// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import history from '../plugins/products';
import {hot} from 'react-hot-loader/root';
import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router-dom';

import {getHistory} from 'utils/browser_history';
import store from 'stores/redux_store.jsx';

import {makeAsyncComponent} from 'components/async_load';

import CRTPostsChannelResetWatcher from 'components/threading/channel_threads/posts_channel_reset_watcher';
const LazyRoot = React.lazy(() => import('components/root'));
import axios from 'axios';

const Root = makeAsyncComponent('Root', LazyRoot);
// const WebSocket: any = new WebSocketClient();
class App extends React.PureComponent {
    connectFailCount = 0;
    componentDidMount() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-console
        console.log = (...args) => null;
        if (window.location.search?.includes('token')) {
            let baseUrl = 'https://goserver.staging.chicmic.co.in';
            let redirectSearchUrl = window.location.search;
            redirectSearchUrl = redirectSearchUrl.replaceAll('%2F', '/');
            redirectSearchUrl = redirectSearchUrl.replaceAll('%3F', '?');
            redirectSearchUrl = redirectSearchUrl.replaceAll('%3D', '=');
            const queryParam = redirectSearchUrl?.split('=').at(-1);
            if (redirectSearchUrl.includes('local')) {
                baseUrl = 'https://goserver.local.chicmic.co.in';
            } else {
                axios.get('https://goserver.local.chicmic.co.in/ping').
                    then(() => {
                        window.open('https://mattermost.local.chicmic.co.in', '_self');
                    }).
                    catch(() => {
                        window.open('https://webapp.staging.chicmic.co.in', '_self');
                    });
            }
            const url = `${baseUrl}/login?token=${queryParam}`;

            // queryParam
            if (queryParam) {
                axios.get(url, {withCredentials: true}).
                    then(() => {
                        history.push('/chicmic/channels/town-square');
                    }).
                    catch(() => {
                        //  window.close()
                    });
            }
        }
    }
    render() {
        return (
            <Provider store={store}>
                <CRTPostsChannelResetWatcher/>
                <Router history={getHistory()}>
                    <Route
                        path='/'
                        component={Root}
                    />
                </Router>
            </Provider>
        );
    }
}

export default hot(App);
