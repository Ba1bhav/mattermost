// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import history from "../plugins/products";
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
import { WebSocketClient } from '@mattermost/client';

const Root = makeAsyncComponent('Root', LazyRoot);
const WebSocket:any = new WebSocketClient();
class App extends React.PureComponent {
    connectFailCount=0;
    componentDidMount(){
        console.log("mount<>><<><<>");
        if(window.location.search?.includes('token'))
        {
                let redirectSearchUrl = window.location.search;
                console.log(window.location.search,' componentDidMount');
                redirectSearchUrl = redirectSearchUrl.replaceAll('%2F', '/');
                redirectSearchUrl = redirectSearchUrl.replaceAll('%3F', '?');
                redirectSearchUrl = redirectSearchUrl.replaceAll('%3D', '=')
                console.log('redirectSearchUrl:', redirectSearchUrl);
                const queryParam = redirectSearchUrl?.split('=').at(-1);
                console.log(queryParam, redirectSearchUrl, 'param<><>');
                const url = `https://goserver.staging.chicmic.co.in/login?token=${queryParam}`;
                // queryParam
            if(queryParam)
            {
                    axios.get(url,{withCredentials: true})
                        .then((response) => {
                            console.log('api <><>< call success ',response)
                            WebSocket.onerror = (evt:any) => {
                                if (this.connectFailCount <= 1) {
                                    console.log('websocket error'); //eslint-disable-line no-console
                                    console.log(evt, ',><><><> event '); //eslint-disable-line no-console
                                    alert('Socket error ws');
                                }
                    
                                // this.errorCallback?.(evt);
                                // this.errorListeners.forEach((listener) => listener(evt));
                            };
                            history.push('/chicmic/channels/town-square');
                        })
                        .catch((error) => {
                          //  window.close()
                        })
                        // const obj = parseQueryData(window.location);
                        // console.log(this.props.hcaistory, ' parseQ');
        
                    // similar behavior as an HTTP redirect
                    // window.location.replace("localhost:8065/chicmic1/channels/town-square");
                    // this.props.history.push('/chicmic1/channels/town-square');
                
            // }
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
