// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use lol::{get_remote_data, RemoteData};
use tauri::Builder;
use tokio_tungstenite::{connect_async};

mod cmds;
mod lol;
mod utils;

#[tokio::main]
async fn main() {
    Builder::default()
        .invoke_handler(tauri::generate_handler![
            cmds::greet,
            cmds::get_token,
            cmds::send_lol_req_cmd,
            cmds::get_champs,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    send_ws().await;
}

async fn send_ws() {
    let remote_data: RemoteData = get_remote_data();
    let base_url = format!("wss://127.0.0.1:{}", remote_data.port);
    let url: String = format!("{}/lol-lobby/v2/lobby", base_url);

    let ws = connect_async(url.as_str()).await;
    println!("{:#?}", ws);
}
