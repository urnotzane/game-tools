// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::Builder;
use utils::send_lol_ws;

mod cmds;
mod lol;
mod utils;

#[tokio::main]
async fn main() {
    tokio::spawn(async move {
        send_lol_ws().await;
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

