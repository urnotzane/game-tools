// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;

use lol::{get_remote_data, RemoteData};
use native_tls::TlsConnector;
use tauri::Builder;
use tokio_tungstenite::{connect_async_tls_with_config, Connector};
use futures_util::StreamExt;

mod cmds;
mod lol;
mod utils;

#[tokio::main]
async fn main() {
    tokio::spawn(async move {
        send_ws().await;
    });
    Builder::default()
        .invoke_handler(tauri::generate_handler![
            cmds::greet,
            cmds::get_token,
            cmds::send_lol_req_cmd,
            cmds::get_champs,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

async fn send_ws() {
    let remote_data: RemoteData = get_remote_data();
    let base_url = format!("ws://127.0.0.1:{}", remote_data.port);
    let url: String = format!("{}/lol-lobby/v2/lobby", base_url);

    // let cert_file = fs::read("src/riotgames.pem").unwrap();
    // let cert = native_tls::Certificate::from_pem(&cert_file).unwrap();

    let connector = TlsConnector::builder()
        // .add_root_certificate(cert)
        .danger_accept_invalid_certs(true)
        .build()
        .unwrap();

    let connector = Connector::NativeTls(connector);

    println!("------开始连接{}------", url.as_str());
    let (ws_stream, ws_res) = connect_async_tls_with_config(
        url.as_str(), None, false, Some(connector))
        .await.expect("------连接失败------");
    
    println!("-----连接成功：{}------", ws_res.status());

    let (_write, read) = ws_stream.split();
    
    let msg = read.for_each(|message| async {
        let data = message.unwrap().into_data();
        println!("{:#?}", data);
    });

    println!("{:#?}", msg.await);
}
