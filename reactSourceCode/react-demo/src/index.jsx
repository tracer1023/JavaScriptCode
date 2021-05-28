import React from 'react';
import ReactDOM from './zreact/react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const today = (
    <div className="border">
        <h1>今天又是美好的一天</h1>
    </div>
);

ReactDOM.render(
    today,
    //   <React.StrictMode>
    //     <App />
    //   </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// 不同节点渲染方式不同


//原生标签节点
//文本节点
