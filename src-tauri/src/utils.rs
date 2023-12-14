#[warn(deprecated)]
use base64::encode;
use http::Request;
use native_tls::TlsConnector;
use reqwest::Method;
use serde_json::Value;
use tokio_tungstenite::{Connector, connect_async_tls_with_config, tungstenite::Message};
use std::{collections::HashMap, os::windows::process::CommandExt, process::Command};
use futures_util::{StreamExt, SinkExt};
use crate::lol::{get_remote_data, RemoteData};

#[cfg(unix)]
pub fn execute_sys_cmd(cmd_str: &str) -> String {
    let output = Command::new(cmd_str)
        .arg("-l")
        .output()
        .expect("failed to execute process");

    let stdout = String::from_utf8(output.stdout).unwrap();
    stdout
}
#[cfg(windows)]
pub fn execute_command(cmd_str: &str) -> String {
    let output = Command::new("cmd")
        // 运行cmd时隐藏窗口
        .creation_flags(0x08000000)
        .args(["/C", cmd_str])
        .output()
        .expect("failed to execute process");

    String::from_utf8_lossy(&output.stdout).to_string()
}

pub async fn send_lol_req(
    method: &str,
    url: &str,
    data: Option<HashMap<String, Value>>,
) -> Result<String, reqwest::Error> {
    let remote_data: RemoteData = get_remote_data();
    let method_byte = method.as_bytes();
    let base_url = format!("https://127.0.0.1:{}", remote_data.port);

    let client: reqwest::Client = reqwest::Client::builder()
        .danger_accept_invalid_certs(true)
        .no_proxy()
        .build()
        .unwrap();

    let response = client
        .request(
            Method::from_bytes(method_byte).unwrap(),
            format!("{}{}", base_url, url),
        )
        .basic_auth("riot", Some(remote_data.remote_token))
        .json(&data)
        .send()
        .await?
        .text()
        .await?;
    Ok(response)
}

pub async fn send_lol_ws()  {
    let remote_data: RemoteData = get_remote_data();
    let base_url = &format!("wss://127.0.0.1:{}", remote_data.port);

    let url = url::Url::parse(base_url).unwrap();
    let host = url.host_str().expect("Invalid host in WebSocket URL");

    let connector = TlsConnector::builder()
        .danger_accept_invalid_certs(true)
        .build()
        .unwrap();
    let connector = Connector::NativeTls(connector);

    let auth_base64 = encode(format!("riot:{}", remote_data.remote_token));
    let request = Request::builder()
        .method("GET")
        .uri(base_url)
        // LCU API认证
        .header("Authorization", format!("Basic {}", auth_base64))
        .header("Host", host)
        .header("Upgrade", "websocket")
        .header("Connection", "upgrade")
        .header("Sec-Websocket-Key", "lcu")
        .header("Sec-Websocket-Version", "13")
        .body(())
        .unwrap();
    println!("------开始连接{}------", base_url.as_str());
    let (mut ws_stream, ws_res) = connect_async_tls_with_config(
        request, None, false, Some(connector))
        .await.expect("连接失败");
    
    println!("-----连接成功：{:#?}------", ws_res);
    
    let msgs = "[5,\"OnJsonApiEvent\"]".to_string();

    let _ = ws_stream.send(Message::Text(msgs)).await.unwrap();

    while let Some(msg) = ws_stream.next().await {
        let msg = msg.unwrap();
        if msg.is_text() || msg.is_binary() {
            // msg为空时表示ws_stream.send成功
            println!("receive msg: {}", msg);
        }
    }
}